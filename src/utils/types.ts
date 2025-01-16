export type product = {
  picture: string | null;
  product_name: string;
  product_category: string;
  product_sizes: Array<{ label: string; value: string }>;
  product_color: Array<{ label: string; value: string }>;
  product_price: string;
  product_description: string;
};
