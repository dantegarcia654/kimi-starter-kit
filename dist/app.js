const KIMI_URL = 'http://kimi.ai?utm_campaign=TR_YqObYt0Y&utm_content=&utm_medium=Instagram&utm_source=CH_pzQ7f4g6&utm_term=';
// Keep the exact campaign URL, including intentionally empty UTM values.
document.querySelectorAll('[data-kimi]').forEach(link => { link.href = KIMI_URL; });
const prompts = {
  script: {
    tag: '01 / THE SCRIPT',
    result: 'A 30-second Reel script with a hook, spoken narration, on-screen text, and one next step.',
    note: 'Read it aloud and approve the script before moving to the shot list. Add your own voice and check every factual claim.',
    text: `Act as a short-form video scriptwriter. Turn my rough idea into a practical 30-second Instagram Reel.

Idea: [ROUGH IDEA]
Audience: [AUDIENCE]
Viewer’s next step: [NEXT STEP]
Tone: [TONE, e.g. conversational, direct, warm]
Verified details to include: [YOUR FACTS, or “none”]

Expected output:
1. One specific hook that earns attention without exaggeration.
2. A three-beat script table with time range, spoken narration, and on-screen text. Aim for 60–75 spoken words total, including the hook and closing line.
3. End with one natural call to action matching the next step above.

Keep it achievable with a phone in one location. Use plain language and avoid filler. Do not invent results, statistics, product features, or personal experiences. Mark any factual claim that needs verification. Return the script, not a list of alternatives.`
  },
  shots: {
    tag: '02 / THE SHOT LIST',
    result: 'Six practical shots totaling 30 seconds, each matched to narration and a simple filming instruction.',
    note: 'Use the script you approved. If you start a new chat, paste that script into the placeholder first.',
    text: `Act as a practical director for a solo creator. Turn the approved script into a filmable shot list for a 30-second vertical Instagram Reel.

Idea: [ROUGH IDEA]
Audience: [AUDIENCE]
Approved script: [PASTE APPROVED SCRIPT, or use the most recent approved script above in this chat]
Available location and props: [LOCATION + PROPS, e.g. desk, phone, notebook]
Filming setup: one creator, one phone, available light, 9:16 vertical.

Expected output:
Return a table with exactly six shots. Include shot number, time range, matching spoken line, framing and camera movement, the action to film, and on-screen text. The timings must total 30 seconds with no gaps or overlaps.

Map every spoken line to a shot. Keep each instruction specific and achievable by one person. Use simple cuts and only the props listed. Do not add new claims or change the approved message. Finish with a short filming checklist and call out any shot that needs a substitute.`
  },
  caption: {
    tag: '03 / THE CAPTION',
    result: 'One ready-to-edit caption of 60–100 words, a clear call to action, and up to three relevant hashtags.',
    note: 'Review the caption against the script. Add any required sponsorship disclosure yourself before publishing.',
    text: `Act as an Instagram caption editor. Write one caption for the Reel described below.

Idea: [ROUGH IDEA]
Audience: [AUDIENCE]
Approved script: [PASTE APPROVED SCRIPT, or use the most recent approved script above in this chat]
Viewer’s next step: [NEXT STEP]
Voice: [TONE, e.g. conversational, direct, warm]
Verified details or required disclosure: [YOUR FACTS + DISCLOSURE, or “none”]

Expected output:
Write one caption of 60–100 words, excluding hashtags. Lead with a specific first line, add a useful takeaway that complements the video, and end with one clear call to action. Include no more than three relevant hashtags on a separate line.

Use short paragraphs and natural language. Preserve any disclosure I provide. Do not invent discounts, guarantees, personal results, urgency, or facts. Do not add a link or promise a DM automation unless I explicitly provided one. Return only the caption and hashtags.`
  }
};
let currentPrompt = 'script';
let copyGeneration = 0;
const tabs = [...document.querySelectorAll('[role="tab"]')];
function personalizedPrompt(key) {
  let text = prompts[key].text;
  for (const [token, id] of [['[ROUGH IDEA]', 'idea'], ['[AUDIENCE]', 'audience'], ['[NEXT STEP]', 'action']]) {
    const value = document.getElementById(id).value.trim();
    if (value) text = text.replaceAll(token, () => value);
  }
  return text;
}
function selectPrompt(key, focus = false) {
  currentPrompt = key;
  copyGeneration++;
  const prompt = prompts[key];
  tabs.forEach(tab => { const selected = tab.dataset.prompt === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; if (selected && focus) tab.focus(); });
  document.querySelector('#prompt-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelector('#prompt-text').textContent = personalizedPrompt(key);
  document.querySelector('#prompt-tag').textContent = prompt.tag;
  document.querySelector('#prompt-result').textContent = prompt.result;
  document.querySelector('#prompt-note').textContent = prompt.note;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-prompt').innerHTML = 'Copy prompt <span aria-hidden="true">↗</span>';
}
['idea','audience','action'].forEach(id => document.getElementById(id).addEventListener('input', () => selectPrompt(currentPrompt)));
const exampleBrief = { idea: 'Three phone shots that make a small desk look good on camera', audience: 'Creators filming at home with a phone', action: 'Save this and try these three shots before filming your next Reel' };
document.getElementById('load-example').addEventListener('click', () => {
  for(const [id, value] of Object.entries(exampleBrief)) document.getElementById(id).value = value;
  selectPrompt('script');
  document.querySelector('#copy-status').textContent = 'Example loaded. Your script, shot list, and caption prompts now use this brief.';
  document.getElementById('idea').focus();
});
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
  const text = personalizedPrompt(currentPrompt);
  const generation = ++copyGeneration;
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch {
    const field = document.createElement('textarea'); field.value = text; field.style.cssText = 'position:fixed;left:-9999px'; document.body.append(field); field.select();
    try { copied = document.execCommand('copy'); } catch {}
    field.remove();
  }
  if (generation !== copyGeneration) return;
  document.querySelector('#copy-status').textContent = copied ? 'Copied. Open Kimi and paste your prompt. Fill any remaining brackets first.' : 'Copy isn’t available here. Select the prompt text above, or download all prompts.';
  if (copied) document.querySelector('#copy-prompt').textContent = 'Copied ✓';
});
selectPrompt('script');
