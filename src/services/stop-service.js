import $api from "../http/index";
export class StopService {
  static async stopReprTest() {
    return $api.get("/stopReprTest");
  }

  static async stopDocTest() {
    return $api.get("/stopDocTest");
  }
}
