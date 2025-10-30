import { Random, Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    // #1 구입 금액 입력
    const purchaseAmount = await this.getpurchaseAmount();

    // #2 구입 금액 유효성 검사
    // #3 구매 장수 계산
    // #5 로또 번호 출력
    // #6 당첨 번호 입력
    // #8 보너스 번호 입력
    // #12 당첨 통계 출력
    // #13 수익률 계산 및 출력
  }
  // #1 구입 금액 입력 함수
  async getpurchaseAmount() {
    const input = await Console.readLineAsync("구입금액을 입력해 주세요");
    return Number(input.trim());
  }
}

export default App;
