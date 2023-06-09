import $api from "../http/index";
export class UserDataService {
  static async userData(firstName, lastName, id, id2) {
    return $api.post("/user", { firstName, lastName, id, id2 });
  }

  static async getUserData() {
    return $api.get("/user");
  }
}
