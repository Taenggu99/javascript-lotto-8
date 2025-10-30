import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    // #1 구입 금액 입력
    const purchaseAmount = await this.getpurchaseAmount();

    // #2 구입 금액 유효성 검사
    if (!this.isValidAmount(purchaseAmount)) {
      throw new Error("[Error] 구입 금액은 1000원 단위로 입력해주세요");
    }
    // #3 구매 장수 계산
    const ticketCount = purchaseAmount / 1000;
    Console.print(`${ticketCount}개를 구매했습니다.`);

    // #5 로또 번호 출력
    const tickets = [];
    for (let i = 0; i < ticketCount; i++) {
      const lotto = new Lotto(Lotto.generateRandomNumbers());
      tickets.push(lotto.getNumbers());
    }

    tickets.forEach((numbers) => Console.print(`[${numbers.join(", ")}]`));
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
  // #2 구입 금액 유효성 검사 함수
  isValidAmount(amount) {
    if (isNaN(amount) || amount <= 0 || amount % 1000 !== 0) {
      return false;
    }
    return true;
  }
  // #3 구매 장수 계산 함수

  // #5 로또 번호 출력 함수
  // #6 당첨 번호 입력 함수
  // #8 보너스 번호 입력 함수
  // #12 당첨 통계 출력 함수
  // #13 수익률 계산 및 출력 함수
}

export default App;
