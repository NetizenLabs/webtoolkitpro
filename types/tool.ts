export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface ToolConfig {
  name: string;
  slug: string;
  category: string;
  icon?: string;
  subcategory?: string;
  tags: string[];
  priority?: number;
  releaseDate?: string;
  isComingSoon?: boolean;
  
  function: {
    primary: string;
    secondary?: string;
  };

  technical: {
    input_formats: string[];
    output_formats: string[];
    max_file_size_mb?: number;
    processing: 'client-side' | 'server-side';
    library?: string;
    complexity?: string;
  };

  content: {
    title?: string; // H1 override
    description: string; // Meta description
    entity_definition: string; // First 150 words block
    tldr?: string; // Concise hook for the beginning of the page
    how_it_works: string;
    use_cases: string[];
    features: string[];
    faq: ToolFAQ[];
    keywords?: string[] | string;
    technical_specs?: TechnicalSpec[];
    practical_application?: string;
    code_blueprints?: { language: string; code: string; title?: string }[];
    steps?: { name: string; text: string }[];
  };

  related_tools?: string[]; // Manual overrides if needed
  workflow_next?: string[]; // Recommended next tools in chain
  
  meta?: {
    title?: string; // HTML Title override
    description?: string; // HTML Meta Description
    keywords?: string[];
  };

  locale?: string; // Placeholder for i18n
  variants?: string[]; // Slugs of variant tools
}
