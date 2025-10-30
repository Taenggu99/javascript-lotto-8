class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

// #4 로또 번호 생성 및 정렬  
// #7 당첨 번호 유효성 검사   
// #9 보너스 번호 유효성 검사 
// #10 번호 일치 개수 계산     
// #11 등수 판별 (보너스 포함) |

  // TODO: 추가 기능 구현
}

export default Lotto;
