interface HowToInput {
  title: string;
  description: string;
  prepTime: string;
  totalTime: string;
  yield: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  url: string;
}

export function generateHowToSchema(input: HowToInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.title,
    description: input.description,
    prepTime: input.prepTime,
    totalTime: input.totalTime,
    yield: input.yield,
    supply: input.ingredients.map((ing) => ({
      '@type': 'HowToSupply',
      name: ing.name,
      requiredQuantity: ing.amount,
    })),
    step: input.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
    url: input.url,
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebSiteSchema(
  name: string,
  url: string,
  description: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
  };
}
