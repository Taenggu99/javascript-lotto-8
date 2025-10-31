import { Random } from "@woowacourse/mission-utils";

class Lotto {
  #numbers; // 로또 번호 6개 저장

  // 메인 생성자: numbers 배열을 받아 검증 후 저장
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  // 로또 번호가 6개인지 검증
  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // #4 로또 번호 랜덤 생성 및 오름차순 정렬
  static generateRandomNumbers() {
    return Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
  }

  // 외부에서 번호 확인
  getNumbers() {
    return this.#numbers;
  }

  // #7 당첨 번호 유효성 검사
  static isValidWinningNumber(numbers) {
    if (!Array.isArray(numbers)) return false;
    if (numbers.length !== 6) return false; // 6개 입력
    const hasDuplicate = new Set(numbers).size !== numbers.length;
    if (hasDuplicate) return false; // 중복 검사
    return numbers.every(
      (num) => Number.isInteger(num) && num >= 1 && num <= 45
    );
  }

  // #9 보너스 번호 유효성 검사
  static isValidBonusNumber(number) {
    return Number.isInteger(number) && number >= 1 && number <= 45;
  }

  // #10 번호 일치 개수 계산
  matchCount(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }
  // #11 등수 판별 (보너스 포함)
  getRank(count, bonusNumber) {
    const numbers = this.#numbers;
    const hasBonus = numbers.includes(bonusNumber);

    if (count === 6) return 1; // 1등
    if (count === 5 && hasBonus) return 2; // 2등
    if (count === 5) return 3; // 3등
    if (count === 4) return 4; // 4등
    if (count === 3) return 5; // 5등
  }
  // TODO: 추가 기능 구현
}

export default Lotto;
