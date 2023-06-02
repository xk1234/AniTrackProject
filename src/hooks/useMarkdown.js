const useMarkdown = (text) => {
  const imgReg = /img\d*\((.+)\)/gi;
  const strikeReg = /~~(.+?)~~/gi;
  const boldReg = /__(.+?)__/gi;
  const boldReg2 = /\*\*(.+?)\*\*/gi;
  const italicReg = /_(.+?)_/gi;
  const linkReg = /\[(.*?)\]\((.+?)\)/gi;
  const imgReg2 = /\[image\]\((.+?)\)/gi;
  const centerReg = /~~~(.+?)~~~/gi;
  const code = /```(.*?)```/gi;
  const codeReg2 = /~~~/gi;
  const headerReg = /#(.+)/gi;
  const bqReg = />"(.+?)"/gi;
  text = text
    .replace(code, "$1")
    .replace(codeReg2, "")
    .replace(centerReg, "<center>$1</center>")
    .replace(imgReg, '<img src="$1" alt="" />')
    .replace(imgReg2, '<img src="$1" alt="" />')
    .replace(strikeReg, "<strike>$1</strike>")
    .replace(boldReg, "<strong>$1</strong>")
    .replace(boldReg2, "<strong>$1</strong>")
    .replace(italicReg, "<em>$1</em>")
    .replace(linkReg, "<a href=$2 >$1</a>")
    .replace(headerReg, "<h2>$1</h2>")
    .replace(bqReg, "<blockquote>$1</blockquote>");

  return text;
};

export default useMarkdown;
