async function retry(fn, retries = 3, delay = 1000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt === retries) throw err;
      await new Promise(res => setTimeout(res, delay * 2 ** attempt));
    }
  }
}
module.exports = retry;
