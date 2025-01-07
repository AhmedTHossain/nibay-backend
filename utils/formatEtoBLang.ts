export const formatEnglishToBangalNum = (n: any) =>
  n?.replace(/\d/g, (d: any) => "০১২৩৪৫৬৭৮৯"[d]);
