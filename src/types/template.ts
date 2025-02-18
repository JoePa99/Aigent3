interface Template {
  id: string;
  category: 'brand' | 'research' | 'creative' | 'gtm';
  name: string;
  description: string;
  inputFields: InputField[];
  promptTemplate: string;
}

interface InputField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'textarea';
  required: boolean;
  options?: string[]; // For select fields
} 