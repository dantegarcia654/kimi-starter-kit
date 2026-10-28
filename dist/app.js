const KIMI_URL = 'http://kimi.ai?utm_campaign=TR_YqObYt0Y&utm_content=&utm_medium=Instagram&utm_source=CH_pzQ7f4g6&utm_term=';
// One canonical campaign destination. Empty UTM values are intentional.
document.querySelectorAll('[data-kimi]').forEach(link => { link.href = KIMI_URL; });
const prompts = {
  space: {
    tag: 'A BROWSER PROJECT YOU CAN REMIX',
    note: 'The included demo is a starting point from this guide. Your Kimi output will vary.',
    text: `Build a stylized, interactive Space Explorer as one complete HTML file with inline CSS and JavaScript. Use no external libraries, network requests, or build tools.

Include a sun, three selectable planets, animated orbits, a pause/resume button, a speed slider, and a reset button. Show the selected planet’s name and a short description. Label the scene as illustrative and not to scale.

Style it like a premium editorial website: near-black background, off-white type, muted olive accents, generous spacing, and clear controls. Make it work on phones and desktops, support keyboard navigation, and respect reduced-motion preferences.

If I attach or paste an existing HTML starter, improve that file rather than starting over. My customization: [describe your theme, planets, or interaction].

Return the full HTML file, followed by simple instructions to save it as index.html and open it in a browser. Check that every control has a working event handler.`
  },
  site: {
    tag: 'TURN ONE CLEAR IDEA INTO A PAGE',
    note: 'Replace the bracketed details before sending. Ask for revisions after you open the first version.',
    text: `Create a complete, responsive one-page website for [my project or business].

Audience: [who it is for].
Main action: [what visitors should do].
Offer: [what I provide and why it is useful].
Details to include: [real facts, links, and contact information].

Use a white background, bold black typography, warm neutral surfaces, subtle borders, generous whitespace, and rounded buttons. Keep the language specific and easy to read. Do not invent testimonials, customers, prices, or performance claims.

Include a clear headline, a useful explanation of the offer, three practical details, a short FAQ, and one primary call to action. Make all navigation and controls work. Do not create a fake form that claims to submit data.

Return one complete HTML file with inline CSS and JavaScript, no external dependencies, and accessible markup. Explain how to save and open it locally. If a requested feature needs a backend, explain that clearly.`
  },
  research: {
    tag: 'GET A BRIEF YOU CAN ACTUALLY USE',
    note: 'Use Kimi’s available search tools or supply sources. Check the sources before relying on the result.',
    text: `Help me make a decision about [specific topic or question].

My situation: [context].
My constraints: [budget, time, location, or requirements].
What I need to decide: [the concrete choice].

If you have web search available, use current primary sources and link directly to each source. If you cannot browse, say so and ask me to provide relevant material. Never invent a citation.

Return a concise brief with:
1. A direct answer and the main reason behind it.
2. A comparison of the relevant options against my constraints.
3. The strongest evidence, with source links and dates where available.
4. What remains uncertain or needs checking.
5. A practical next step I can take today.

Clearly separate sourced facts from your interpretation. For each important claim, make it easy for me to verify the original evidence.`
  }
};
let currentPrompt = 'space';
let copyGeneration = 0;
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectPrompt(key, focus = false) {
  currentPrompt = key;
  copyGeneration++;
  const prompt = prompts[key];
  tabs.forEach(tab => { const selected = tab.dataset.prompt === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; if (selected && focus) tab.focus(); });
  document.querySelector('#prompt-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelector('#prompt-text').textContent = prompt.text;
  document.querySelector('#prompt-tag').textContent = prompt.tag;
  document.querySelector('#prompt-note').textContent = prompt.note;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-prompt').innerHTML = 'Copy prompt <span aria-hidden="true">↗</span>';
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectPrompt(tab.dataset.prompt));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectPrompt(tabs[next].dataset.prompt, true); }
  });
});
document.querySelector('#copy-prompt').addEventListener('click', async () => {
  const text = prompts[currentPrompt].text;
  const generation = ++copyGeneration;
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch {
    const field = document.createElement('textarea'); field.value = text; field.style.cssText = 'position:fixed;left:-9999px'; document.body.append(field); field.select();
    try { copied = document.execCommand('copy'); } catch {}
    field.remove();
  }
  if (generation !== copyGeneration) return;
  document.querySelector('#copy-status').textContent = copied ? 'Copied. Open Kimi and paste your prompt.' : 'Copy isn’t available here. Select the prompt text above, or download all prompts.';
  if (copied) document.querySelector('#copy-prompt').textContent = 'Copied ✓';
});
selectPrompt('space');
