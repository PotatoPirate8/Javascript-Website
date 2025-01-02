// Initialize dark mode before DOM content loads
(function initDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
      document.body.classList.add('dark-mode');
  }
})();

const users = JSON.parse(localStorage.getItem('users')) || {}; // Load users from local storage

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const usernameInput = form.querySelector('[name="uname"]');
          const passwordInput = form.querySelector('[name="psw"]');
          if (!usernameInput || !passwordInput) { 
              return;
          }
          const username = usernameInput.value;
          const password = passwordInput.value;

          // Simple validation (replace with actual authentication logic)
          if (users[username] && users[username].password === password) {
              alert('Login successful!');
              localStorage.setItem('currentUser', username); // Save current user
              window.location.href = 'index.html'; // Redirect to index.html
          } else {
              alert('Login failed. Please try again.');
          }
      });
  }

  // Function to create a new user
  window.createUser = function(username, password) {
      if (users[username]) {
          return false; // User already exists
      }
      const memberSince = new Date().toLocaleDateString();
      users[username] = { password, memberSince };
      localStorage.setItem('users', JSON.stringify(users));
      return true; // Account created successfully
  };

  const createAccountForm = document.getElementById('createAccountForm');
  if (createAccountForm) {
      createAccountForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const username = event.target.username.value;
          const password = event.target.password.value;
      
      // Check if user exists and credentials match
      if (users[username] && users[username].password === password) {
          alert('Account exists! Logging you in...');
          localStorage.setItem('currentUser', username);
          window.location.href = 'index.html';
          return;
      }
      
      // If user doesn't exist, create new account
      if (!createUser(username, password)) {
          alert('Account already exists! Please choose a different username.');
          return;
      }

      alert('Account created successfully!');
      window.location.href = 'login.html';
  });
  }

  createUser('user', 'password');
});

document.addEventListener('DOMContentLoaded', () => {
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Mars"
  },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
if (!nextButton) return; // Exit if button doesn't exist

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = '';
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('bg-gray-200', 'hover:bg-gray-400', 'text-gray-800', 'font-bold', 'py-2', 'px-4', 'rounded');
    button.addEventListener('click', () => selectAnswer(answer));
    answersElement.appendChild(button);
  });
  updateProgress(currentQuestionIndex + 1, quizData.length); // Update progress bar
}

function selectAnswer(answer) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (answer === currentQuestion.correct) {
    alert('Correct!');
    score++;
  } else {
    alert('Wrong!');
  }
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    alert('Quiz completed!');
    saveScore(score, quizData.length, 'General Quiz'); // Save the score to local storage with quiz name
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
  }
});

function saveScore(score, total, quizName) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    alert('No user logged in');
    return;
  }
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push({ 
    user: currentUser, 
    quiz: quizName, 
    score: score,  // Store just the number
    total: total   // Store total separately
  });
  localStorage.setItem('scores', JSON.stringify(scores));
}

loadQuestion();
});

document.addEventListener('DOMContentLoaded', () => {
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
  document.getElementById('UserInfo').innerHTML = `
  <div class="welcome-message">
    Welcome, ${currentUser}!
  </div>`;
  const loginButton = document.querySelector('button[onclick="location.href=\'login.html\'"]');
  if (loginButton) {
    loginButton.textContent = 'Profile';
    loginButton.setAttribute('onclick', "location.href='profile.html'");
  }
}

const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}
});

document.addEventListener('DOMContentLoaded', () => {
// Add this new event listener for contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Store the message in localStorage (you might want to send this to a server in a real application)
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push({
      name,
      email,
      message,
      date: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Clear the form
    contactForm.reset();
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
  });
}
});

// Update the toggleDarkMode function
function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.querySelector('.dark-mode-toggle i');
  
  body.classList.toggle('dark-mode');
  
  // Update icon based on dark mode state
  if (body.classList.contains('dark-mode')) {
      darkModeToggle.classList.remove('fa-moon');
      darkModeToggle.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'true');
  } else {
      darkModeToggle.classList.remove('fa-sun');
      darkModeToggle.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'false');
  }
}

// Search functionality
function searchQuizzes(searchTerm) {
const quizCards = document.querySelectorAll('.quiz-card');
quizCards.forEach(card => {
  const title = card.querySelector('h2').textContent.toLowerCase();
  const description = card.querySelector('p').textContent.toLowerCase();
  const matches = title.includes(searchTerm.toLowerCase()) || 
    description.includes(searchTerm.toLowerCase());
  card.style.display = matches ? 'block' : 'none';
});
}

// Quiz progress tracking
function updateProgress(current, total) {
const progressBar = document.querySelector('.progress-bar-fill');
if (progressBar) {
  const percentage = (current / total) * 100;
  progressBar.style.width = `${percentage}%`;
}
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
// Dark mode initialization
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
  document.body.classList.add('dark-mode');
  const darkModeToggle = document.querySelector('.dark-mode-toggle i');
  if (darkModeToggle) {
      darkModeToggle.classList.remove('fa-moon');
      darkModeToggle.classList.add('fa-sun');
  }
}

// Search initialization
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuizzes(e.target.value);
  });
}
});

(function() {
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    const darkModeToggle = document.querySelector('.dark-mode-toggle i');
    if (darkModeToggle) {
        darkModeToggle.classList.remove('fa-moon');
        darkModeToggle.classList.add('fa-sun');
    }
}
})();

document.addEventListener('DOMContentLoaded', () => {
const quizCards = document.querySelectorAll('.bg-gray-200');

quizCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

const slideInOnScroll = () => {
    quizCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.classList.add('slide-in');
        }
    });
};

window.addEventListener('scroll', slideInOnScroll);
slideInOnScroll(); // Run on page load
});

// Quiz Creation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const newQuizForm = document.getElementById('newQuizForm');
    const addQuestionBtn = document.getElementById('addQuestion');
    const questionsContainer = document.getElementById('questions');
    const createdQuizzesContainer = document.getElementById('createdQuizzes');

    let questionCount = 0;

    function createQuestionHTML(index) {
        return `
            <div class="question-container p-4 border rounded">
                <h3 class="font-bold mb-2">Question ${index + 1}</h3>
                <div class="mb-2">
                    <label class="block text-gray-700 mb-2">Question Text</label>
                    <input type="text" name="questions[${index}][text]" required class="w-full p-2 border rounded">
                </div>
                <div class="mb-2">
                    <label class="block text-gray-700 mb-2">Image (optional)</label>
                    <input type="file" name="questions[${index}][image]" accept="image/*" class="w-full p-2 border rounded">
                </div>
                <div class="answers space-y-2">
                    <input type="text" placeholder="Option A" name="questions[${index}][options][]" required class="w-full p-2 border rounded">
                    <input type="text" placeholder="Option B" name="questions[${index}][options][]" required class="w-full p-2 border rounded">
                    <input type="text" placeholder="Option C" name="questions[${index}][options][]" required class="w-full p-2 border rounded">
                    <input type="text" placeholder="Option D" name="questions[${index}][options][]" required class="w-full p-2 border rounded">
                </div>
                <div class="mt-2">
                    <label class="block text-gray-700 mb-2">Correct Answer</label>
                    <select name="questions[${index}][correct]" required class="w-full p-2 border rounded">
                        <option value="0">Option A</option>
                        <option value="1">Option B</option>
                        <option value="2">Option C</option>
                        <option value="3">Option D</option>
                    </select>
                </div>
            </div>
        `;
    }

    function displayCreatedQuizzes() {
        const quizzes = JSON.parse(localStorage.getItem('createdQuizzes')) || [];
        const createdQuizzesContainer = document.getElementById('createdQuizzes');
        
        if (!createdQuizzesContainer) return;
    
        if (quizzes.length === 0) {
            createdQuizzesContainer.innerHTML = '<p class="text-gray-600">No quizzes have been created yet.</p>';
            return;
        }
    
        // Sort quizzes by creation date (oldest first)
        const sortedQuizzes = quizzes.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateA - dateB;
        });
    
        createdQuizzesContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                ${sortedQuizzes.map((quiz, index) => `
                    <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-bold text-gray-800 truncate">${quiz.title}</h3>
                        <p class="text-gray-600 mt-2 mb-2">${quiz.about || 'No description available'}</p>
                        <p class="text-gray-600">${quiz.questions.length} questions</p>
                        <p class="text-gray-400 text-sm">${formatDate(quiz.createdAt)}</p>
                        <div class="mt-4 flex flex-col space-y-2">
                            <button onclick="startQuiz(${index})" 
                                    class="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                Start Quiz
                            </button>
                            <button onclick="deleteQuiz(${index})" 
                                    class="w-full bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Helper function to format dates
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    // Add function to delete quiz
    window.deleteQuiz = function(index) {
        if (confirm('Are you sure you want to delete this quiz?')) {
            const quizzes = JSON.parse(localStorage.getItem('createdQuizzes')) || [];
            quizzes.splice(index, 1);
            localStorage.setItem('createdQuizzes', JSON.stringify(quizzes));
            displayCreatedQuizzes();
        }
    };

    // Update startQuiz function
    window.startQuiz = function(index) {
        const quizzes = JSON.parse(localStorage.getItem('createdQuizzes')) || [];
        const quiz = quizzes[index];
        if (quiz) {
            localStorage.setItem('currentQuiz', JSON.stringify(quiz));
            window.location.href = 'play-quiz.html';
        } else {
            alert('Quiz not found!');
        }
    };

    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', () => {
            questionsContainer.insertAdjacentHTML('beforeend', createQuestionHTML(questionCount));
            questionCount++;
        });
    }

    if (newQuizForm) {
        newQuizForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(newQuizForm);
            const quiz = {
                title: formData.get('quizTitle'),
                about: formData.get('quizAbout'), // Add this line to capture the about text
                category: formData.get('quizCategory'),
                createdAt: new Date().toISOString(),
                questions: []
            };

            // Process each question
            const questionElements = questionsContainer.getElementsByClassName('question-container');
            for (let i = 0; i < questionElements.length; i++) {
                const options = [];
                // Get all options for this question
                const optionInputs = questionElements[i].querySelectorAll('input[name^="questions"][name$="[options][]"]');
                for (const input of optionInputs) {
                    if (!input.value.trim()) {
                        alert('Please fill in all answer options');
                        return;
                    }
                    options.push(input.value.trim());
                }

                const questionData = {
                    text: formData.get(`questions[${i}][text]`),
                    options: options,
                    correct: parseInt(formData.get(`questions[${i}][correct]`)),
                    image: null
                };

                // Validate data
                if (!questionData.text || options.length !== 4) {
                    alert(`Please fill in all fields for question ${i + 1}`);
                    return;
                }

                // Handle image upload
                const imageFile = formData.get(`questions[${i}][image]`);
                if (imageFile && imageFile.size > 0) {
                    const base64Image = await convertImageToBase64(imageFile);
                    questionData.image = base64Image;
                }

                quiz.questions.push(questionData);
            }

            // Save to localStorage
            const existingQuizzes = JSON.parse(localStorage.getItem('createdQuizzes')) || [];
            existingQuizzes.push(quiz);
            localStorage.setItem('createdQuizzes', JSON.stringify(existingQuizzes));

            // Reset form but maintain one empty question
            newQuizForm.reset();
            questionsContainer.innerHTML = createQuestionHTML(0);
            questionCount = 1;

            // Update quiz display without clearing the form
            displayCreatedQuizzes();
            alert('Quiz created successfully! You can create another quiz.');

            // Scroll to the created quizzes section
            document.getElementById('createdQuizzes').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Convert image file to base64
    function convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Initialize the form with one question and display existing quizzes
    if (questionsContainer) {
        questionsContainer.innerHTML = createQuestionHTML(questionCount);
        questionCount++;
        displayCreatedQuizzes();
    }
});

// Function to start a created quiz
function startQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem('createdQuizzes')) || [];
    const quiz = quizzes[index];
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
    window.location.href = 'play-quiz.html';
}