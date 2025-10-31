import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    // #1 구입 금액 입력
    const purchaseAmount = await this.getpurchaseAmount();

    // #2 구입 금액 유효성 검사
    if (!this.isValidAmount(purchaseAmount)) {
      throw new Error("[Error] 구입 금액은 1000원 단위로 입력해주세요\n");
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
    const winningInput = await this.getWinningNumber();

    //// #6.1 당첨 번호 유효성 검사
    const winningArr = winningInput.split(",").map((n) => Number(n.trim()));

    if (!Lotto.isValidWinningNumber(winningArr)) {
      throw new Error("[Error] 당첨 번호를 재 확인해주세요");
    }
    // #8 보너스 번호 입력
    const bonusInput = await this.getBonusNumber();
    const bonusNumber = Number(bonusInput.trim());
    if(!Lotto.isValidBonusNumber(bonusNumber)){
      throw new Error ("[Error] 보너스 번호를 재 입력해주세요")
    }


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

  // #6 당첨 번호 입력 함수
  async getWinningNumber() {
    const input = await Console.readLineAsync("당첨 번호를 입력해 주세요");
    return input;
  }
  //// #6.1 당첨 번호 유효성 검사;

  isValidWinningNumber(number) {
    if (isNaN(number) || number <= 0 || number > 45) {
      return false;
    }
    return true;
  }
  // #8 보너스 번호 입력 함수
  async getBonusNumber(){
    const input = await Console.readLineAsync("보너스 번호를 입력해주세요");
    return input;
  }
  // #12 당첨 통계 출력 함수
  // #13 수익률 계산 및 출력 함수
}

export default App;
