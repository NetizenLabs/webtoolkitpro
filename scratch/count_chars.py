import yaml
import json
with open('../config/tools.yaml', encoding='utf-8') as f:
    data = yaml.safe_load(f)
for t in data['tools']:
    if t['slug'] == 'redirect-checker':
        def print_lengths(obj, path=""):
            if isinstance(obj, dict):
                for k, v in obj.items():
                    print_lengths(v, path + "." + k)
            elif isinstance(obj, list):
                for i, v in enumerate(obj):
                    print_lengths(v, path + "[" + str(i) + "]")
            elif isinstance(obj, str):
                print(f"{path}: {len(obj)}")
        print_lengths(t)
