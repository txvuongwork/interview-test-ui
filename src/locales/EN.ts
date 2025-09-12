export const EN = {
  button: {
    login: "Login",
    register: "Register",
    seeMore: "See more",
    comment: "Comment",
    share: "Share",
    viewDetail: "View detail",
    logout: "Logout",
    ok: "OK",
    search: "Search",
    reset: "Reset",
  },
  authLayout: {
    title: "Welcome to {{platform}}",
    subtitle: "Modern sharing and discussion platform for the community",
    keyFeatures: [
      {
        title: "Seamless Content Creation",
        subtitle:
          "Share your thoughts with our intuitive editor and beautiful formatting",
      },
      {
        title: "Smart Discovery",
        subtitle:
          "Discover amazing content tailored to your interests and preferences",
      },
      {
        title: "Real-time Engagement",
        subtitle:
          "Connect instantly through comments, reactions, and live discussions",
      },
    ],
  },
  header: {
    searchPlaceholder: "Search content",
    showResults: "Show results for {{query}}",
    searchEmpty: "Please enter content to search",
    search: "Search",
  },
  loginPage: {
    title: "Welcome Back!",
    subtitle: "Sign in to continue your journey and connect with the community",
    dontHaveAccount: "Don't have an account?",
  },
  registerPage: {
    title: "Join {{platform}} Today",
    subtitle:
      "Create your account and start sharing your amazing stories with the world",
    alreadyHaveAccount: "Already have an account?",
    message: {
      success: "You have successfully registered! Please login to continue",
    },
  },
  blog: {
    notFound: "Blog not found",
    commentPlaceholder: "Add a comment",
    commentCreated: "Comment created successfully!",
    loadMoreComments: "Load more comments",
    search: {
      input: {
        title: "Search title, content",
        placeholder: "Search title, content, ...",
      },
      select: {
        title: "Sort by created date",
        option: {
          createdDate: "Newest",
          createdDateAsc: "Oldest",
        },
      },
      notFound: "No blog found for ",
    },
  },
  mobileMenu: {
    title: "Menu",
    account: "Account",
  },
  field: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    firstName: {
      label: "First name",
      placeholder: "Enter your first name",
    },
    lastName: {
      label: "Last name",
      placeholder: "Enter your last name",
    },
  },
  errorMessage: {
    required: "Please enter {{field}}",
    invalidFormat: "Please enter a valid {{field}}",
    maxLength: "{{field}} must be less than {{length}} characters",
    minLength: "{{field}} must be at least {{length}} characters",
  },
  errorModal: {
    title: "Error",
  },
  error: {
    validate: {
      login: {
        "invalid-credential":
          "Email or password is incorrect. Please try again.",
      },
    },
    user: {
      "already-exists":
        "Email already exists. Please try again with a different email.",
    },
  },
};
