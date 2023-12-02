# cd .\01;
$fileContent = Get-Content -Path input.txt;
# https://regex101.com/r/AS5pyh/1
$regex = "(?:(?:(one|two|three|four|five|six|seven|eight|nine|\d).*(one|two|three|four|five|six|seven|eight|nine|\d))|(?<_>one|two|three|four|five|six|seven|eight|nine|\d))";

$sum = 0;
foreach ( $line in $fileContent.Split("`n")) {
  $line -match $regex | Out-Null;
  
  if ($null -ne $Matches._) {
    $number1 = $Matches[0];
    $number2 = $Matches[0];
  }
  else {
    $number1 = $Matches[1];
    $number2 = $Matches[2];
  }
  try {
    $number1 = [int]$number1;
  }
  catch {
    switch ($number1) {
      "one" { $number1 = 1 }
      "two" { $number1 = 2 }
      "three" { $number1 = 3 }
      "four" { $number1 = 4 }
      "five" { $number1 = 5 }
      "six" { $number1 = 6 }
      "seven" { $number1 = 7 }
      "eight" { $number1 = 8 }
      "nine" { $number1 = 9 }
    }
  }
  try {
    $number2 = [int]$number2;
  }
  catch {
    switch ($number2) {
      "one" { $number2 = 1 }
      "two" { $number2 = 2 }
      "three" { $number2 = 3 }
      "four" { $number2 = 4 }
      "five" { $number2 = 5 }
      "six" { $number2 = 6 }
      "seven" { $number2 = 7 }
      "eight" { $number2 = 8 }
      "nine" { $number2 = 9 }
    }
  }
  $sum += [int]"$number1$number2";
}
$sum;