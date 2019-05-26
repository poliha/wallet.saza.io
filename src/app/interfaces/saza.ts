export interface SazaAccount {
  public: string;
  private: {
    text: string;
    iv: string;
    salt: string;
  };
}

// export const EmptySazaAccount = {
//   public: '', private: {
//     text: '',
//     iv: '',
//     salt: ''
//   }
// };