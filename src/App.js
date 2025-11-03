import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    // #1 구입 금액 입력
    const purchaseAmount = await this.getValidPurchaseAmount();

    // #3 구매 장수 계산
    const ticketCount = purchaseAmount / 1000;
    Console.print("");
    Console.print(`${ticketCount}개를 구매했습니다.`);

    // #5 로또 번호 출력
    const tickets = [];
    for (let i = 0; i < ticketCount; i++) {
      const lotto = new Lotto(Lotto.generateRandomNumbers());
      tickets.push(lotto);
      Console.print(`[${lotto.getNumbers().join(", ")}]`);
    }

    // #6 당첨 번호 입력
    const winningArr = await this.getValidWinningNumbers();

    // #8 보너스 번호 입력
    const bonusNumber = await this.getValidBonusNumber();

    // #10 당첨 결과 계산
    const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 0: 0 }; // 0 = 꽝
    tickets.forEach((ticket) => {
      const matchCount = ticket.matchCount(winningArr);
      const rank = ticket.getRank(matchCount, bonusNumber);
      stats[rank]++;
    });

    // #11 등수별 상금 테이블
    const prizeMoney = {
      1: 2000000000,
      2: 30000000,
      3: 1500000,
      4: 50000,
      5: 5000,
      0: 0,
    };

    // #12 당첨 통계 출력
    Console.print("");
    Console.print("당첨 통계");
    Console.print("---");

    const prizeInfo = [
      { match: 3, prize: 5000, count: stats[5] },
      { match: 4, prize: 50000, count: stats[4] },
      { match: 5, prize: 1500000, count: stats[3] },
      { match: 5, prize: 30000000, count: stats[2], bonus: true },
      { match: 6, prize: 2000000000, count: stats[1] },
    ];

    prizeInfo.forEach((info) => {
      const prizeText = info.prize.toLocaleString("ko-KR");
      if (info.bonus) {
        Console.print(
          `${info.match}개 일치, 보너스 볼 일치 (${prizeText}원) - ${info.count}개`
        );
      } else {
        Console.print(
          `${info.match}개 일치 (${prizeText}원) - ${info.count}개`
        );
      }
    });

    // #13 수익률 계산
    const totalPrize = Object.entries(stats).reduce(
      (sum, [rank, count]) => sum + prizeMoney[Number(rank)] * count,
      0
    );
    const profitRate = Math.round((totalPrize / purchaseAmount) * 1000) / 10;
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }

  // #1 구입 금액 입력 및 유효성 검사
  async getValidPurchaseAmount() {
    while (true) {
      const input = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
      const amount = Number(input.trim());
      if (this.isValidAmount(amount)) return amount;
      Console.print("[ERROR] 구입 금액은 1000원 단위로 입력해주세요.");
    }
  }

  // #2 구입 금액 유효성 검사
  isValidAmount(amount) {
    return !(isNaN(amount) || amount <= 0 || amount % 1000 !== 0);
  }

  // #6 당첨 번호 입력 및 유효성 검사
  async getValidWinningNumbers() {
    while (true) {
      const input = await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
      const numbers = input
        .trim()
        .split(",")
        .map((n) => Number(n.trim()));
      if (Lotto.isValidWinningNumber(numbers)) return numbers;
      Console.print("[ERROR] 당첨 번호를 재 확인해주세요.");
    }
  }

  // #8 보너스 번호 입력 및 유효성 검사
  async getValidBonusNumber() {
    while (true) {
      const input = await Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
      const number = Number(input.trim());
      if (Lotto.isValidBonusNumber(number)) return number;
      Console.print("[ERROR] 보너스 번호를 재 입력해주세요.");
    }
  }
}

export default App;
