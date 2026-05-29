type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue; }
interface JsonArray extends Array<JsonValue> {}

export function generateTypescript(jsonStr: string, rootName: string = 'Root'): string {
    let obj;
    try { obj = JSON.parse(jsonStr); } catch (e) { return '// Invalid JSON'; }
    if (typeof obj !== 'object' || obj === null) return `type ${rootName} = ${typeof obj};`;
    
    let interfaces: string[] = [];
    
    function parseObject(o: any, name: string): string {
        if (Array.isArray(o)) {
            if (o.length === 0) return 'any[]';
            const itemType = parseObject(o[0], name + 'Item');
            return `${itemType}[]`;
        } else if (o !== null && typeof o === 'object') {
            let props = '';
            for (const key in o) {
                const typeName = parseObject(o[key], name + capitalize(key));
                props += `  ${key}: ${typeName};\n`;
            }
            interfaces.push(`export interface ${name} {\n${props}}`);
            return name;
        } else {
            return typeof o;
        }
    }
    
    parseObject(obj, rootName);
    return interfaces.reverse().join('\n\n');
}

export function generateGo(jsonStr: string, rootName: string = 'Root'): string {
    let obj;
    try { obj = JSON.parse(jsonStr); } catch (e) { return '// Invalid JSON'; }
    if (typeof obj !== 'object' || obj === null) return `type ${rootName} interface{}`;
    
    let structs: string[] = [];
    
    function parseObject(o: any, name: string): string {
        if (Array.isArray(o)) {
            if (o.length === 0) return '[]interface{}';
            const itemType = parseObject(o[0], name + 'Item');
            return `[]${itemType}`;
        } else if (o !== null && typeof o === 'object') {
            let props = '';
            for (const key in o) {
                const goKey = capitalize(key);
                const typeName = parseObject(o[key], name + goKey);
                props += `\t${goKey} ${typeName} \`json:"${key}"\`\n`;
            }
            structs.push(`type ${name} struct {\n${props}}`);
            return name;
        } else {
            if (typeof o === 'number') return Number.isInteger(o) ? 'int' : 'float64';
            if (typeof o === 'string') return 'string';
            if (typeof o === 'boolean') return 'bool';
            return 'interface{}';
        }
    }
    
    parseObject(obj, rootName);
    return structs.reverse().join('\n\n');
}

export function generatePydantic(jsonStr: string, rootName: string = 'RootModel'): string {
    let obj;
    try { obj = JSON.parse(jsonStr); } catch (e) { return '# Invalid JSON'; }
    if (typeof obj !== 'object' || obj === null) return '# Only objects are supported';
    
    let classes: string[] = [];
    
    function parseObject(o: any, name: string): string {
        if (Array.isArray(o)) {
            if (o.length === 0) return 'List[Any]';
            const itemType = parseObject(o[0], name + 'Item');
            return `List[${itemType}]`;
        } else if (o !== null && typeof o === 'object') {
            let props = '';
            for (const key in o) {
                const typeName = parseObject(o[key], name + capitalize(key));
                props += `    ${key}: ${typeName}\n`;
            }
            if (!props) props = '    pass\n';
            classes.push(`class ${name}(BaseModel):\n${props}`);
            return name;
        } else {
            if (typeof o === 'number') return Number.isInteger(o) ? 'int' : 'float';
            if (typeof o === 'string') return 'str';
            if (typeof o === 'boolean') return 'bool';
            return 'Any';
        }
    }
    
    parseObject(obj, rootName);
    return `from typing import List, Any\nfrom pydantic import BaseModel\n\n` + classes.reverse().join('\n\n');
}

function capitalize(s: string) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
}
