import $api from "../http/index";

export class RunTestService {
  static async runTest(testName) {
    return $api.get(`${"/" + testName}`);
  }
}
