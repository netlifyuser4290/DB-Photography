
export type Photo = {
  id: string;
  title: string;
  description?: string | null;
  image_url: string;
  category?: string | null;
  show_on_home?: boolean | null;
  show_in_recent?: boolean | null;
  created_at: string;
};
