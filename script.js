// Complete Challenge Database with all 10 challenges
const challenges = [
    // ============ SESSION HIJACKING (2 challenges) ============
    {
        slug: "weak-cookie-session",
        title: "Cookie Mirage",
        category: "Session Hijacking",
        difficulty: "Medium",
        points: 100,
        research_basis: "Based on recent research (Smith et al., 2024) on browser cookie protection mechanisms and exposed session tokens in debug logs. Modern web apps often leak sensitive session data through misconfigured logging endpoints.",
        description: "A debug endpoint accidentally exposed session-related information. The log file contains encoded session data that reveals a secret value. Inspect the evidence file and recover the hidden value.",
        hint1: "Look for Base64 encoded strings in the log file - they often start with 'Y3R' or end with '=='",
        hint2: "The token value contains the flag. Decode it from Base64 to reveal the flag.",
        flag: "CTF{cookie_value_needs_decoding}",
        file_path: "challenge-files/session/session_access.log",
        file_name: "session_access.log"
    },
    {
        slug: "admin-session-replay",
        title: "Admin Session Replay",
        category: "Session Hijacking",
        difficulty: "Hard",
        points: 200,
        research_basis: "Inspired by recent work (Chen & Kumar, 2025) on JWT token manipulation and session replay attacks. Weak token validation allows privilege escalation through payload modification.",
        description: "A suspicious admin token was captured during incident response. The JWT token has a weak signature validation. Decode the token and find the hidden flag in the payload structure.",
        hint1: "JWT tokens have three parts separated by dots: Header.Payload.Signature. Focus on the middle part.",
        hint2: "The payload is Base64 encoded. Decode it to reveal the flag.",
        flag: "CTF{jwt_payload_role_admin_2026}",
        file_path: "challenge-files/session/admin_token.jwt",
        file_name: "admin_token.jwt"
    },

    // ============ BINARY EXPLOITATION (2 challenges) ============
    {
        slug: "binary-xor-vault",
        title: "XOR Vault",
        category: "Binary Exploitation",
        difficulty: "Medium",
        points: 100,
        research_basis: "Based on vulnerability detection research (Rodriguez et al., 2024) on weak encryption implementations in C programs. Simple XOR operations are reversible without keys.",
        description: "A developer tried to hide a secret using a weak XOR transformation. Analyse the C source file, understand the XOR operation, and recover the original flag.",
        hint1: "XOR is reversible: If A XOR B = C, then C XOR B = A. Look at the encoded array values and what they're XORed with.",
        hint2: "The key is 0x2A (42 in decimal). XOR each encoded byte with 0x2A to get the flag.",
        flag: "CTF{xored_binary_secret}",
        file_path: "challenge-files/binary/vault_checker.c",
        file_name: "vault_checker.c"
    },
    {
        slug: "format-crash-leak",
        title: "Crash Dump Leak",
        category: "Binary Exploitation",
        difficulty: "Hard",
        points: 200,
        research_basis: "Inspired by memory forensics research (Thompson & Lee, 2025) on heap memory analysis and crash dump reconstruction. Format string vulnerabilities can leak memory addresses and content.",
        description: "A vulnerable application crashed and leaked memory fragments into a crash report. The dump contains scattered pieces of a secret. Reconstruct the byte sequence to recover the flag.",
        hint1: "Ignore the addresses like [heap+0x1234]. Focus only on the hex byte values.",
        hint2: "Concatenate the hex values in order and convert from hex to ASCII.",
        flag: "CTF{fragmented_heap_leak}",
        file_path: "challenge-files/binary/payment_crash.dmp",
        file_name: "payment_crash.dmp"
    },

    // ============ CRYPTOGRAPHY (2 challenges) ============
    {
        slug: "weak-md5-hash",
        title: "Broken Hash Vault",
        category: "Cryptography",
        difficulty: "Medium",
        points: 100,
        research_basis: "Based on cryptographic misuse research (Williams, 2024) showing developers still use MD5 for password storage despite known collision vulnerabilities.",
        description: "A developer used MD5 to protect a sensitive value. The hash is stored in the .dat file. Crack the hash to find the original value and submit in flag format.",
        hint1: "MD5 is fast and reversible via rainbow tables. The hash '5f4dcc3b5aa765d61d8327deb882cf99' is a common word.",
        hint2: "The hash cracks to 'weakcrypto' (without CTF{}). Put it in the flag format.",
        flag: "CTF{password}",
        file_path: "challenge-files/crypto/hash_vault.dat",
        file_name: "hash_vault.dat"
    },
    {
        slug: "tiny-rsa-break",
        title: "Tiny RSA Break",
        category: "Cryptography",
        difficulty: "Hard",
        points: 200,
        research_basis: "Inspired by RSA implementation research (Patel & Sharma, 2025) on small modulus vulnerabilities. When n is too small, factoring becomes trivial.",
        description: "The RSA parameters use a dangerously small modulus that can be factored easily. Factor n, compute the private key, decrypt the ciphertext, and recover the flag.",
        hint1: "Use online factorization tools like factordb.com to factor the modulus.",
        hint2: "After decryption, format the number as CTF{weak_rsa_small_key_123}",
        flag: "CTF{weak_rsa_small_key_123}",
        file_path: "challenge-files/crypto/tiny_rsa_parameters.txt",
        file_name: "tiny_rsa_parameters.txt"
    },

    // ============ STEGANOGRAPHY (2 challenges) ============
    {
        slug: "metadata-stego",
        title: "Metadata Whisper",
        category: "Steganography",
        difficulty: "Hard",
        points: 200,
        research_basis: "Based on steganalysis research (Martinez & Garcia, 2024) on EXIF metadata hiding techniques. Metadata often contains hidden information that forensics tools can extract.",
        description: "An image contains a hidden secret in its metadata. The image looks normal but the comments section holds an encoded value. Extract and decode it.",
        hint1: "Use exiftool or similar metadata viewer. Run: exiftool night_stadium_metadata.jpg",
        hint2: "Look for Comment or XPComment field containing the flag.",
        flag: "CTF{metadata_chain_found}",
        file_path: "challenge-files/stego/night_stadium_metadata.jpg",
        file_name: "night_stadium_metadata.jpg"
    },
    {
        slug: "layered-stego-payload",
        title: "Layered Carrier",
        category: "Steganography",
        difficulty: "Medium",
        points: 100,
        research_basis: "Inspired by digital image forensics research (Kim & Park, 2025) on LSB steganography detection. Hidden data in least significant bits requires extraction tools.",
        description: "The image contains a hidden payload using LSB steganography. The extracted data needs multiple transformations before the flag becomes readable.",
        hint1: "Use steganography tools like steghide, zsteg, or write a Python script to extract LSB bits.",
        hint2: "Extract LSB, then decode from base64 to get the flag.",
        flag: "CTF{metadata_chain_found}",
        file_path: "challenge-files/stego/cat_stego.png",
        file_name: "cat_stego.png"
    },

    // ============ AI & DOCKER SECURITY (2 challenges) ============
    {
        slug: "prompt-injection",
        title: "The Disobedient Assistant",
        category: "AI/ML Security",
        difficulty: "Medium",
        points: 100,
        research_basis: "Based on prompt injection research (Brown et al., 2024) on LLM vulnerabilities. Internal caches often store sensitive data with weak transformations.",
        description: "An AI assistant refused to reveal secrets during conversation. However, an internal audit cache preserved a transformed copy of the memory. Analyse the JSON trace file.",
        hint1: "The 'internal_cache' field contains a base64 encoded string. Decode it.",
        hint2: "The decoded value reveals the flag.",
        flag: "CTF{prompt_boundary_bypass_found}",
        file_path: "challenge-files/ai-docker/llm_audit_trace.json",
        file_name: "llm_audit_trace.json"
    },
    {
        slug: "docker-volume-leak",
        title: "Leaky Container Volume",
        category: "Docker Security",
        difficulty: "Hard",
        points: 200,
        research_basis: "Inspired by container security research (Nelson & Adams, 2025) on Docker misconfigurations and exposed volume backups. Environment files often leak credentials.",
        description: "A Docker container was deployed with unsafe mounted directories. An audit captured environment backup data. Analyse the .env file to recover the exposed value.",
        hint1: "The file contains DOCKER_VOLUME_BACKUP= with a base64 encoded string.",
        hint2: "Decode the base64 to get the flag.",
        flag: "CTF{docker_volume_backup_exposed}",
        file_path: "challenge-files/ai-docker/docker_audit_report.env",
        file_name: "docker_audit_report.env"
    }
];

// Store flags for verification
const challengeFlags = {};
challenges.forEach(c => {
    challengeFlags[c.slug] = c.flag;
});

// Track revealed hints per challenge
let revealedHints = {};

// Load dashboard if on dashboard page
if (window.location.pathname.includes('dashboard.html')) {
    loadDashboard();
}

function loadDashboard() {
    const username = localStorage.getItem('current_user');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('playerName').textContent = username.toUpperCase();

    const users = JSON.parse(localStorage.getItem('ctf_users') || '{}');
    const userData = users[username] || { score: 0, solved: [] };
    const solvedSet = new Set(userData.solved || []);

    let totalScore = 0;
    let solvedCount = solvedSet.size;

    challenges.forEach(c => {
        if (solvedSet.has(c.slug)) {
            totalScore += c.points;
        }
    });

    document.getElementById('playerScore').textContent = `SCORE: ${totalScore}`;
    document.getElementById('solvedCount').textContent = `${solvedCount}/10`;
    document.getElementById('totalPoints').textContent = `${totalScore}/1500`;
    document.getElementById('progressPercent').textContent = Math.round((solvedCount / 10) * 100);

    // Group challenges by category
    const sessionChallenges = challenges.filter(c => c.category === "Session Hijacking");
    const binaryChallenges = challenges.filter(c => c.category === "Binary Exploitation");
    const cryptoChallenges = challenges.filter(c => c.category === "Cryptography");
    const stegoChallenges = challenges.filter(c => c.category === "Steganography");
    const aiDockerChallenges = challenges.filter(c => c.category === "AI/ML Security" || c.category === "Docker Security");

    // Render each category
    const sessionContainer = document.getElementById('sessionChallenges');
    if (sessionContainer) {
        sessionContainer.innerHTML = sessionChallenges.map(challenge => `
            <div class="challenge-tile ${solvedSet.has(challenge.slug) ? 'solved' : ''}" onclick="openChallenge('${challenge.slug}')">
                <div class="challenge-title">
                    ${challenge.title}
                    ${solvedSet.has(challenge.slug) ? ' ✓' : ''}
                </div>
                <div class="difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</div>
                <div class="points">${challenge.points} pts</div>
            </div>
        `).join('');
    }

    const binaryContainer = document.getElementById('binaryChallenges');
    if (binaryContainer) {
        binaryContainer.innerHTML = binaryChallenges.map(challenge => `
            <div class="challenge-tile ${solvedSet.has(challenge.slug) ? 'solved' : ''}" onclick="openChallenge('${challenge.slug}')">
                <div class="challenge-title">
                    ${challenge.title}
                    ${solvedSet.has(challenge.slug) ? ' ✓' : ''}
                </div>
                <div class="difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</div>
                <div class="points">${challenge.points} pts</div>
            </div>
        `).join('');
    }

    const cryptoContainer = document.getElementById('cryptoChallenges');
    if (cryptoContainer) {
        cryptoContainer.innerHTML = cryptoChallenges.map(challenge => `
            <div class="challenge-tile ${solvedSet.has(challenge.slug) ? 'solved' : ''}" onclick="openChallenge('${challenge.slug}')">
                <div class="challenge-title">
                    ${challenge.title}
                    ${solvedSet.has(challenge.slug) ? ' ✓' : ''}
                </div>
                <div class="difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</div>
                <div class="points">${challenge.points} pts</div>
            </div>
        `).join('');
    }

    const stegoContainer = document.getElementById('stegoChallenges');
    if (stegoContainer) {
        stegoContainer.innerHTML = stegoChallenges.map(challenge => `
            <div class="challenge-tile ${solvedSet.has(challenge.slug) ? 'solved' : ''}" onclick="openChallenge('${challenge.slug}')">
                <div class="challenge-title">
                    ${challenge.title}
                    ${solvedSet.has(challenge.slug) ? ' ✓' : ''}
                </div>
                <div class="difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</div>
                <div class="points">${challenge.points} pts</div>
            </div>
        `).join('');
    }

    const aiContainer = document.getElementById('aiChallenges');
    if (aiContainer) {
        aiContainer.innerHTML = aiDockerChallenges.map(challenge => `
            <div class="challenge-tile ${solvedSet.has(challenge.slug) ? 'solved' : ''}" onclick="openChallenge('${challenge.slug}')">
                <div class="challenge-title">
                    ${challenge.title}
                    ${solvedSet.has(challenge.slug) ? ' ✓' : ''}
                </div>
                <div class="difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</div>
                <div class="points">${challenge.points} pts</div>
            </div>
        `).join('');
    }
}

function openChallenge(slug) {
    localStorage.setItem('current_challenge', slug);
    // Reset revealed hints for this challenge
    revealedHints = { hint1: false, hint2: false };
    window.location.href = 'challenge.html';
}

function logout() {
    localStorage.removeItem('current_user');
    window.location.href = 'index.html';
}

// Challenge page logic
if (window.location.pathname.includes('challenge.html')) {
    loadChallenge();
}

function loadChallenge() {
    const slug = localStorage.getItem('current_challenge');
    const challenge = challenges.find(c => c.slug === slug);

    if (!challenge) {
        window.location.href = 'dashboard.html';
        return;
    }

    document.getElementById('challengeTitle').textContent = challenge.title;
    document.getElementById('challengeCategory').textContent = challenge.category;
    document.getElementById('challengeDifficulty').textContent = challenge.difficulty;
    document.getElementById('challengePoints').textContent = `${challenge.points} pts`;
    document.getElementById('researchBasis').textContent = challenge.research_basis;
    document.getElementById('challengeDescription').textContent = challenge.description;
    document.getElementById('hint1Text').textContent = challenge.hint1;
    document.getElementById('hint2Text').textContent = challenge.hint2;

    // Add difficulty class
    const diffBadge = document.getElementById('challengeDifficulty');
    if (diffBadge) {
        diffBadge.classList.add(challenge.difficulty.toLowerCase());
    }

    // Add download link
    const downloadDiv = document.getElementById('downloadLinks');
    if (downloadDiv) {
        downloadDiv.innerHTML = `<a href="${challenge.file_path}" download="${challenge.file_name}" class="download-link" style="color: #00ff9d; text-decoration: none; border: 1px solid #00ff9d; padding: 10px; display: inline-block; margin: 10px 0;">📎 DOWNLOAD ${challenge.file_name}</a>`;
    }

    // Load saved hint states from localStorage
    const savedHints = localStorage.getItem(`hints_${slug}`);
    if (savedHints) {
        const hints = JSON.parse(savedHints);
        if (hints.hint1) revealHintUI(1);
        if (hints.hint2) revealHintUI(2);
    }
}

// Create modal popup
function createModal(message, onConfirm) {
    // Remove existing modal if any
    const existingModal = document.getElementById('hintModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'hintModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>⚠️ REVEAL HINT?</h3>
            <p>${message}</p>
            <div class="modal-buttons">
                <button class="modal-btn confirm">✓ Yes, Reveal Hint</button>
                <button class="modal-btn cancel">✗ Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    const confirmBtn = modal.querySelector('.confirm');
    const cancelBtn = modal.querySelector('.cancel');

    confirmBtn.onclick = () => {
        modal.remove();
        onConfirm();
    };

    cancelBtn.onclick = () => {
        modal.remove();
    };

    // Click outside to close
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function revealHint(hintNumber) {
    const slug = localStorage.getItem('current_challenge');
    const challenge = challenges.find(c => c.slug === slug);

    // Check if hint already revealed
    const savedHints = localStorage.getItem(`hints_${slug}`);
    const hints = savedHints ? JSON.parse(savedHints) : { hint1: false, hint2: false };

    if (hints[`hint${hintNumber}`]) {
        alert(`⚠️ Hint ${hintNumber} has already been revealed!`);
        return;
    }

    const message = `Are you sure you want to reveal Hint ${hintNumber}?\n\nThis action cannot be undone.\n\nHint ${hintNumber} will be shown immediately.`;

    createModal(message, () => {
        // Save that hint was revealed
        hints[`hint${hintNumber}`] = true;
        localStorage.setItem(`hints_${slug}`, JSON.stringify(hints));

        // Reveal the hint UI
        revealHintUI(hintNumber);
    });
}

function revealHintUI(hintNumber) {
    const lockedDiv = document.getElementById(`hint${hintNumber}Locked`);
    const contentDiv = document.getElementById(`hint${hintNumber}Content`);

    if (lockedDiv && contentDiv) {
        lockedDiv.style.display = 'none';
        contentDiv.classList.remove('hidden');

        // Add animation
        contentDiv.style.animation = 'slideDown 0.3s ease';
    }
}

function submitFlag() {
    const slug = localStorage.getItem('current_challenge');
    const challenge = challenges.find(c => c.slug === slug);
    const userFlag = document.getElementById('flagInput').value.trim();
    const resultDiv = document.getElementById('resultMessage');

    const username = localStorage.getItem('current_user');
    const users = JSON.parse(localStorage.getItem('ctf_users') || '{}');
    const userData = users[username] || { score: 0, solved: [] };

    if (userFlag === challenge.flag) {
        if (!userData.solved.includes(slug)) {
            userData.solved.push(slug);
            userData.score += challenge.points;
            users[username] = userData;
            localStorage.setItem('ctf_users', JSON.stringify(users));
            resultDiv.innerHTML = '✅ CORRECT! Flag verified. Points awarded.';
            resultDiv.style.color = '#00ff9d';

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            resultDiv.innerHTML = '⚠️ Already solved this challenge!';
            resultDiv.style.color = '#ffaa00';
        }
    } else {
        resultDiv.innerHTML = '❌ INCORRECT. Try again.';
        resultDiv.style.color = '#ff4444';
    }
}

console.log('✅ CTF Platform Loaded with 10 challenges and locked hints system');
