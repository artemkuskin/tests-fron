import $api from "../http/index";
export class CreateService {
  static async createUser() {
    return $api.get("/createNewClient");
  }
}
