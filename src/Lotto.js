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

  // --------------------------------------------
  // #4 로또 번호 랜덤 생성 및 오름차순 정렬
  // 필요하면 외부에서 호출 가능
  static generateRandomNumbers() {
    return Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
  }

  // --------------------------------------------
  // 외부에서 번호 확인
  getNumbers() {
    return this.#numbers;
  }


  // #7 당첨 번호 유효성 검사
  // #9 보너스 번호 유효성 검사
  // #10 번호 일치 개수 계산
  // #11 등수 판별 (보너스 포함)

  // TODO: 추가 기능 구현
}

export default Lotto;
