export class toastInfo {
  isShow: boolean = false;
  message!: String;
  type!: toastType;
}

export class allTypeToast {
  public static information: toastType = {
    text: 'Information',
    color: 'blue',
    image: 'information.svg',
  };
  public static error: toastType = {
    text: 'Erreur',
    color: 'red',
    image: 'error.svg',
  };
  public static success: toastType = {
    text: 'Succès',
    color: 'green',
    image: 'success.svg',
  };
}

interface toastType {
  text: string;
  color: String;
  image: String;
}
