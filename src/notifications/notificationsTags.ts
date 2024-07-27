import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.User.addTag("user_email", email);
}

export function tagUserEmailRemove(email: string) {
  OneSignal.User.removeTag("user_email");
}
