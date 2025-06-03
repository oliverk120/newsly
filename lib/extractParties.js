function parseOpenAIResponse(text) {
  let acquiror = 'N/A';
  let target = 'N/A';
  try {
    const parsed = JSON.parse(text.trim());
    if (parsed.acquiror) acquiror = parsed.acquiror;
    if (parsed.target) target = parsed.target;
  } catch (e) {
    // ignore parsing errors
  }
  return { acquiror, target };
}

module.exports = { parseOpenAIResponse };
