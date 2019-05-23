export interface SazaAccount {
  public: string;
  private: {
    text: string;
    iv: string;
    salt: string;
  };
}