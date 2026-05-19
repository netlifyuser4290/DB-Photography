
export interface Photo {
  public_id: string;
  secure_url: string;
  context?: {
    custom?: {
      alt?: string;
      caption?: string;
      category?: string;
    };
  };
}
