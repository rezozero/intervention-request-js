# Makefile

prerelease:
	@npm version patch

patch:
	@npm version patch

minor:
	@npm version minor

major:
	@npm version major

from-git:
	@npm version from-git