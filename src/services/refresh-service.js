import $api from "../http/index";
export class RefreshService {
  static async refresh() {
    return $api.get("/Refresh");
  }
}
