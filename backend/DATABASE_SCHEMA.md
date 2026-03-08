# KAFS Training Module - Database Schema

## Tables Overview

### Users
- Authentication is now handled by Supabase Auth
- Fields: id, email, password, fullName, username, role, etc.
- Roles: trainee, supervisor, admin

### Modules
- Stores training module information
- 17 modules total (Module 1 through Module 17)
- Fields: title, description, difficulty, estimatedDuration, color

### ModuleContent
- Stores module overview, learning objectives, key concepts
- One-to-one relationship with Modules

### QuizQuestions
- Stores quiz questions for each module
- Approximately 10 questions per module
- Fields: question text, options, correct answer, explanation

### UserProgress
- Tracks user progress through modules
- Status: not_started, in_progress, completed
- Stores progress percentage, quiz score, time spent

### QuizResults
- Stores quiz submission results
- Tracks score, time taken, user answers

### Resources
- Module downloadable resources (PDFs, documents, etc.)
- Fields: fileUrl, fileType, fileSize

### FileUploads
- User-submitted files
- Tracks file metadata

### Assignments
- Module assignments with due dates
- Fields: title, description, dueDate

### AssignmentSubmissions
- User assignment submissions with grading

### DiscussionPost / DiscussionReply
- Module discussions and replies
- Tracks creation date, user, content