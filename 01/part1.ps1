# cd .\01;
$fileContent = Get-Content -Path input.txt;
# https://regex101.com/r/4yAC12/1
$regex = "(?:(?:(\d).*?(\d)(?!.*\d)))|(?<_>\d)";

$sum = 0;
foreach ( $line in $fileContent.Split("`n")) {
  $line -match $regex | Out-Null;
  if ($Matches[0].Length -eq 1) {
    $sum += [int]"$($Matches[0])$($Matches[0])";
  }
  else {
    $sum += [int]"$($Matches[1])$($Matches[2])"
  }
}
$sum;