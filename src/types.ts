
export type Photo = {
  public_id: string;
  url: string;
  secure_url: string;
  created_at: string;
  context?: {
    title?: string;
    description?: string;
    category?: string;
    show_on_home?: string;
    show_in_recent?: string;
  };
};
