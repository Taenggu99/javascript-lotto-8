import { Random } from "@woowacourse/mission-utils";

class Lotto {
  #numbers; // 로또 번호 6개 저장

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // 외부에서 번호 확인
  getNumbers() {
    return this.#numbers;
  }

  // #10 번호 일치 개수 계산
  matchCount(winningNumbers) {
    return this.#numbers.filter(num => winningNumbers.includes(num)).length;
  }

  // #11 등수 판별
  getRank(matchCount, bonusNumber) {
    const hasBonus = this.#numbers.includes(bonusNumber);
    switch (matchCount) {
      case 6: return 1;
      case 5: return hasBonus ? 2 : 3;
      case 4: return 4;
      case 3: return 5;
      default: return 0;
    }
  }

  // #4 로또 번호 랜덤 생성
  static generateRandomNumbers() {
    return Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
  }

  // #7 당첨 번호 유효성 검사
  static isValidWinningNumber(numbers) {
    if (!Array.isArray(numbers) || numbers.length !== 6) return false;
    const hasDuplicate = new Set(numbers).size !== numbers.length;
    if (hasDuplicate) return false;
    return numbers.every(num => Number.isInteger(num) && num >= 1 && num <= 45);
  }

  // #9 보너스 번호 유효성 검사
  static isValidBonusNumber(number) {
    return Number.isInteger(number) && number >= 1 && number <= 45;
  }
}

export default Lotto;
