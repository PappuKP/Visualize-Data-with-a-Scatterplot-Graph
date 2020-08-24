# Contributor’s Guide

## Issues

Issues are a great way to keep track of tasks, enhancements, and bugs for your projects. They’re kind of like email—except they can be shared and discussed with the rest of your team. Most software projects have a bug tracker of some kind. GitHub’s tracker is called Issues, and has its own section in every repository.

##About pull requests

Pull requests let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up commits before the changes are merged into the repository.

##Getting Started

1. If you are new to Git and Github, it is advisable you go through this [link](https://github.com/collections/choosing-projects) before moving to the next step.

2. Fork the project on Github, [Help Guide to Fork a repository.](https://help.github.com/articles/fork-a-repo/)
   ![Fork Image](https://github-images.s3.amazonaws.com/help/bootcamp/Bootcamp-Fork.png)

3. Clone the project.

4. Create a branch specific to the issue you are working on.

   > git checkout -b update-readme-file


    For clarity to yourself and others on the issue you're working on, name your branch 		something like *update-xxx* or *fix-xxx where xxx* is a short description of the changes 	you're making. For example *update-readme* or *fix-typo-on-contribution-md*.

5. Open up the project in your favourite text editor, select the file you want to contribute to and make your changes.

If you are making changes to the README.md file, you would need to have Markdown knowledge. [Visit here to read about Github Markdown](https://guides.github.com/features/mastering-markdown/) and [here to practice](https://www.markdowntutorial.com/).

- If you are adding a new project/organisation to the README, make sure it's listed in alphabetical order.
- If you are adding a new organisation, make sure you add an organisation label to the organisation name. This would help distinguish projects from organisation projects.

6. After making your changes in the new git branch then add your modified files to git, [How to add, commit, push and go](http://readwrite.com/2013/10/02/github-for-beginners-part-2/).

> git add path/to/filename.ext

You can also add all unstaged files using:

> git add .

Note, using a _git add_ . will automatically add all files. You can do a _git status_ to see your changes, but do it before _git add_.

7. Commit your changes using a descriptive commit message.

> git commit -m "Brief Description of Commit"

8. Push your commits to your Github Fork:

> git push -u origin branch-name

9. Submit a pull request.

   Within GitHub, visit this main repository and you should see a banner suggesting to make a pull request. While you're writing up the pull request, you can add _Closes #XXX_ in the message body where _#XXX_ is the issue you're fixing. So an example would be _Closes #42_ would close issue _#42_.

## Submitting a Pull Request

What is a pull request? [Visit link](https://yangsu.github.io/pull-request-tutorial/)

If you decide to fix an issue, it's advisable to check the comment thread in case there's somebody already working on a fix. If no-one is working on it at the moment, kindly leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

In a situation where by somebody decides to fix an issue but doesn't follow up for a particular period of time, say 2-3 weeks, it's acceptable to still pick up the issue but make sure to leave a comment.

Note: Every open-source project has a **CONTRIBUTING.md** file, please make sure to read theirs before you open up a pull request, otherwise your pull request may be rejected. However if you do not see any contributing.md file, you can send a pull request but do it in a descriptive manner.

## Helpful Resources

- [Pro GIT Book](https://git-scm.com/book/en/v2)

- [Try Git](https://try.github.io/levels/1/challenges/1)
