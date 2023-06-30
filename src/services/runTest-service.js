import $api from "../http/index";

export class RunTestService {
  static async runTest(testName, userName) {
    return $api.post(`${"/" + testName}`, { userName });
  }
}
