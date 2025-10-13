// Efeito de digitação que simula código sendo escrito em tempo real
(function () {
  const el = document.getElementById("typed-code");
  const cursor = document.getElementById("code-cursor");
  if (!el || !cursor) return;

  const sequences = [
    'const user = { name: "Seu Nome", role: "Designer / Front-end" };',
    'function build() {',
    '  return <Portfolio theme="blue / black-red" components="minimal, pixel" />;',
    '}',
    'await deploy(user, build());',
    '// Bem-vindo ao meu portfólio'
  ];

  let seqIndex = 0;
  let charIndex = 0;
  let forward = true;
  const typingSpeed = 28;
  const variance = 40;
  const pauseBetween = 900;
  const pauseEnd = 1800;

  function step() {
    const text = sequences[seqIndex];
    if (forward) {
      charIndex++;
      el.textContent = text.slice(0, charIndex);
      if (charIndex >= text.length) {
        forward = false;
        setTimeout(step, seqIndex === sequences.length - 1 ? pauseEnd : pauseBetween);
        return;
      }
    } else {
      charIndex--;
      el.textContent = text.slice(0, charIndex);
      if (charIndex <= 0) {
        forward = true;
        seqIndex = (seqIndex + 1) % sequences.length;
        setTimeout(step, 220);
        return;
      }
    }
    const delay = typingSpeed + Math.random() * variance;
    setTimeout(step, delay);
  }

  window.addEventListener("blur", () => cursor.style.opacity = "0.3");
  window.addEventListener("focus", () => cursor.style.opacity = "1");

  setTimeout(step, 600);
})();
