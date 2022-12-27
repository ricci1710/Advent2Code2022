/**
 * --- Day 25: Full of Hot Air ---
 * As the expedition finally reaches the extraction point, several large hot air balloons drift down to meet you. Crews
 * quickly start unloading the equipment the balloons brought: many hot air balloon kits, some fuel tanks, and a fuel
 * heating machine.
 *
 * The fuel heating machine is a new addition to the process. When this mountain was a volcano, the ambient temperature
 * was more reasonable; now, it's so cold that the fuel won't work at all without being warmed up first.
 *
 * The Elves, seemingly in an attempt to make the new machine feel welcome, have already attached a pair of googly eyes
 * and started calling it "Bob".
 *
 * To heat the fuel, Bob needs to know the total amount of fuel that will be processed ahead of time, so it can correctly
 * calibrate heat output and flow rate. This amount is simply the sum of the fuel requirements of all the hot air
 * balloons, and those fuel requirements are even listed clearly on the side of each hot air balloon's burner.
 *
 * You assume the Elves will have no trouble adding up some numbers and are about to go back to figuring out which
 * balloon is yours when you get a tap on the shoulder. Apparently, the fuel requirements use numbers written in a
 * format the Elves don't recognize; predictably, they'd like your help deciphering them.
 *
 * You make a list of all the fuel requirements (your puzzle input), but you don't recognize the number format
 * either.
 *
 * For example:
 *
 * 1=-0-2
 * 12111
 * 2=0=
 * 21
 * 2=01
 * 111
 * 20012
 * 112
 * 1=-1=
 * 1-12
 * 12
 * 1=
 * 122
 * Fortunately, Bob is labeled with a support phone number. Not to be deterred, you call and ask for help.
 *
 * "That's right, just supply the fuel amount to the-- oh, for more than one burner? No problem, you just need to add
 * together our Special Numeral-Analogue Fuel Units. Patent pending! They're way better than normal numbers for--"
 *
 * You mention that it's quite cold up here and ask if they can skip ahead.
 *
 * "Okay, our Special Numeral-Analogue Fuel Units - SNAFU for short - are sort of like normal numbers. You know how
 * starting on the right, normal numbers have an ones place, a tens place, a hundred place, and so on, where the digit
 * in each place tells you how many of that value you have?"
 *
 * "SNAFU works the same way, except it uses powers of five instead of ten. Starting from the right, you have a ones
 * place, a fives place, a twenty-fives place, a one-hundred-and-twenty-fives place, and so on. It's that easy!"
 *
 * You ask why some digits look like - or = instead of "digits".
 *
 * "You know, I never did ask the engineers why they did that. Instead of using digits four through zero, the
 * digits are 2, 1, 0, minus (written -), and double-minus (written =). Minus is worth -1, and double-minus
 * is worth -2."
 *
 * "So, because ten (in normal numbers) is two fives and no ones, in SNAFU it is written 20. Since eight
 * (in normal numbers) is two fives minus two ones, it is written 2=."
 *
 * "You can do it the other direction, too. Say you have the SNAFU number 2=-01. That's 2 in the 625s place,
 * = (double-minus) in the 125s place, - (minus) in the 25s place, 0 in the 5s place, and 1 in the 1s place.
 * (2 times 625) plus (-2 times 125) plus (-1 times 25) plus (0 times 5) plus (1 times 1).
 * That's 1250 plus -250 plus -25 plus 0 plus 1. 976!"
 *
 * "I see here that you're connected via our premium uplink service, so I'll transmit our handy SNAFU brochure to you
 * now. Did you need anything else?"
 *
 * You ask if the fuel will even work in these temperatures.
 *
 * "Wait, it's how cold? There's no way the fuel - or any fuel - would work in those conditions! There are only a few
 * places in the-- where did you say you are again?"
 *
 * Just then, you notice one of the Elves pour a few drops from a snowflake-shaped container into one of the fuel tanks,
 * thank the support representative for their time, and disconnect the call.
 *
 * The SNAFU brochure contains a few more examples of decimal ("normal") numbers and their SNAFU counterparts:
 *
 *   Decimal          SNAFU
 *         1              1
 *         2              2
 *         3             1=
 *         4             1-
 *         5             10
 *         6             11
 *         7             12
 *         8             2=
 *         9             2-
 *        10             20
 *        15            1=0
 *        20            1-0
 *      1747         1=-0-2
 *      2022         1=11-2
 *     12345        1-0---0
 * 314159265  1121-1110-1=0
 * Based on this process, the SNAFU numbers in the example above can be converted to decimal numbers as follows:
 *
 *  SNAFU  Decimal
 * 1=-0-2     1747
 *  12111      906
 *   2=0=      198
 *     21       11
 *   2=01      201
 *    111       31
 *  20012     1257
 *    112       32
 *  1=-1=      353
 *   1-12      107
 *     12        7
 *     1=        3
 *    122       37
 * In decimal, the sum of these numbers is 4890.
 *
 * As you go to input this number on Bob's console, you discover that some buttons you expected are missing. Instead,
 * you are met with buttons labeled =, -, 0, 1, and 2. Bob needs the input value expressed as a SNAFU number, not in
 * decimal.
 *
 * Reversing the process, you can determine that for the decimal number 4890, the SNAFU number you need to supply to
 * Bob's console is 2=-1=0.
 *
 * The Elves are starting to get cold. What SNAFU number do you supply to Bob's console?
 *
 * --- Part Two ---
 * The hot air balloons quickly carry you to the North Pole. As soon as you land, most of the expedition is escorted
 * directly to a small building attached to the reindeer stables.
 *
 * The head smoothie chef has just finished warming up the industrial-grade smoothie blender as you arrive. It will
 * take 50 stars to fill the blender. The expedition Elves turn their attention to you, and you begin emptying the
 * fruit from your pack onto the table.
 *
 * As you do, a very young Elf - one you recognize from the expedition team - approaches the table and holds up a
 * single star fruit he found. The head smoothie chef places it in the blender.
 *
 * Only 49 stars to go.
 *
 * You don't have enough stars to fill the blender, though. You need 26 more.
 */
class Day25 {
  constructor(values) {
    // 10^x
    this.decimal2SNAFU = new Map();
    this.decimal2SNAFU.set(-2, '=');
    this.decimal2SNAFU.set(-1, '-');
    this.decimal2SNAFU.set(0, '0');
    this.decimal2SNAFU.set(1, '1');
    this.decimal2SNAFU.set(2, '2');
    this.decimal2SNAFU.set(3, '1='); // 5^1 - 2
    this.decimal2SNAFU.set(4, '1-');
    this.decimal2SNAFU.set(5, '10');
    this.decimal2SNAFU.set(6, '11');
    this.decimal2SNAFU.set(7, '12');
    this.decimal2SNAFU.set(8, '2=');
    this.decimal2SNAFU.set(9, '2-');
    this.decimal2SNAFU.set(10, '20')
    this.decimal2SNAFU.set(13, '1==');
    this.decimal2SNAFU.set(15, '1=0');
    this.decimal2SNAFU.set(20, '1-0');
    this.decimal2SNAFU.set(31, '111');
    this.decimal2SNAFU.set(37, '122');
    this.decimal2SNAFU.set(38, '2==');
    this.decimal2SNAFU.set(107, '1-12');
    this.decimal2SNAFU.set(198, '2=0=');
    this.decimal2SNAFU.set(201, '2=01');
    this.decimal2SNAFU.set(353, '1=-1=');
    this.decimal2SNAFU.set(906, '12111');
    this.decimal2SNAFU.set(1257, '20012');
    this.decimal2SNAFU.set(1747, '1=-0-2');
    this.decimal2SNAFU.set(2022, '1=11-2');
    this.decimal2SNAFU.set(12345, '1-0---0');
    this.decimal2SNAFU.set(314159265, '1121-1110-1=0');

    // 5^x
    this.SNAFU2Decimal = new Map();
    this.SNAFU2Decimal.set('1=-0-2', 1747);
    this.SNAFU2Decimal.set('12111', 906);
    this.SNAFU2Decimal.set('2=0=', 198);
    this.SNAFU2Decimal.set('21', 11);
    this.SNAFU2Decimal.set('2=01', 201);
    this.SNAFU2Decimal.set('111', 31);
    this.SNAFU2Decimal.set('20012', 1257);
    this.SNAFU2Decimal.set('112', 32);
    this.SNAFU2Decimal.set('1=-1=', 353);
    this.SNAFU2Decimal.set('1-12', 107);
    this.SNAFU2Decimal.set('12', 7);
    this.SNAFU2Decimal.set('1=', 3);
    this.SNAFU2Decimal.set('122', 37);
  }

  convertSNAFU2Decimal(value) {
    const snafu = value.split('').reverse();
    let result = 0;
    for (let y = 0; y < snafu.length; y += 1) {
      const item = snafu[y];
      let num = parseInt(item, 10);
      if (item === '-')
        num = -1;
      else if (item === '=')
        num = -2;

      result += num * Math.pow(5, y);
    }
    return result;
  }

  // /**
  //  * Example 1 (decimal => octal):
  //  *
  //  * Given Decimal Number: 85
  //  *
  //  * Method followed: Divide the number by 8 until its zero and note remainder in each case.
  //  *                                                                                                5^    543210
  //  * Divide 85 by 8, number is 10, remainder is 5.      1747 / 5 = 349,2 / 69,4 / 13,4 / 2,3 / 0,2 === // 1=-0-2
  //  * Divide 10 by 8, number is 1, remainder is 2.
  //  * Divide 1 by 8, number is 0, remainder is 1.
  //  *
  //  * So the octal number is 125 (remainders in reverse order).
  //  *
  //  * Erlaubter WerteBereich: 2,1,0,-1,-2
  //  * 8 => 1 3 = 1*5 + 3*1
  //  * @param value
  //  */
  static stringInsertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

  convertDecimal2SNAFU = (value) => {
    let result = '';
    let offset = 0;

    let curValue = value;
    let quotient;
    let remainder;
    do {
      quotient = Math.floor(curValue / 5); // => 4 => the times 3 fits into 13
      remainder = curValue % 5;
      curValue = quotient;
      if (remainder === 3) {
        if (offset === 1) {
          result = Day25.stringInsertAt(result, '-', 0);
          offset = 1;
        } else {
          result = Day25.stringInsertAt(result, '=', 0);
          offset = 1;
        }
      } else if (remainder === 4) {
        if (offset === 1) {
          result = Day25.stringInsertAt(result, 0, 0);
          offset = 1;
        } else {
          result = Day25.stringInsertAt(result, '-', 0);
          offset = 1;
        }
      } else {
        if (remainder + offset === 3) {
          result = Day25.stringInsertAt(result, '=', 0);
          offset = 1;
        } else {
          result = Day25.stringInsertAt(result, this.decimal2SNAFU.get(remainder + offset), 0);
          offset = 0;
        }
      }


      if (quotient === 0 && offset)
        result = Day25.stringInsertAt(result, offset.toString(), 0);

    } while (quotient > 0)

    return result;
  }

  calcPartOne(values) {
    let decimal = 0;
    values.forEach((item) => {
      decimal += this.convertSNAFU2Decimal(item);
    });

    return this.convertDecimal2SNAFU(decimal);
  }

  calcPartTwo() {
    return 0;
  }
}

export default Day25;