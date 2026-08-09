import json
import os
import re

projects = ["data-binding", "diretivas", "forms", "pipes", "requests-http", "rotas", "servicos"]
for proj in projects:
    pj = os.path.join(proj, "package.json")
    if not os.path.exists(pj):
        print(f"skip missing {pj}")
        continue
    with open(pj, "r", encoding="utf-8") as f:
        data = json.load(f)

    deps = data.get("dependencies", {})
    dev = data.get("devDependencies", {})
    angular_pkgs = [
        "@angular/animations",
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/forms",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/router",
    ]
    for pkg in angular_pkgs:
        deps[pkg] = "21.2.0"
    deps["rxjs"] = "^7.8.1"
    deps["tslib"] = "^2.8.1"
    deps["zone.js"] = "~0.16.0"

    dev["@angular/cli"] = "21.2.0"
    dev["@angular/compiler-cli"] = "21.2.0"
    dev["@angular/language-service"] = "21.2.0"
    dev["@angular-devkit/build-angular"] = "21.2.0"
    dev["typescript"] = "^5.9.0"
    dev["@types/node"] = "^20.11.0"
    dev["jasmine-core"] = "^6.3.0"
    dev["@types/jasmine"] = "^6.0.0"
    dev["karma"] = "^6.4.4"
    dev["karma-jasmine"] = "^5.1.0"
    dev["karma-jasmine-html-reporter"] = "^2.2.0"
    dev["karma-chrome-launcher"] = "^3.2.0"
    dev["jasmine-spec-reporter"] = "^7.0.0"
    dev["@types/jasminewd2"] = "^2.0.13"
    dev["karma-coverage-istanbul-reporter"] = "^3.0.3"
    dev["ts-node"] = "^10.9.2"
    dev["protractor"] = "^7.0.0"

    for key in ["codelyzer", "tslint"]:
        dev.pop(key, None)

    data["dependencies"] = deps
    data["devDependencies"] = dev

    with open(pj, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"updated {pj}")

    angular_json = os.path.join(proj, "angular.json")
    if os.path.exists(angular_json):
        with open(angular_json, "r", encoding="utf-8") as f:
            angular_data = f.read()

        angular_data = angular_data.replace('"browserTarget"', '"buildTarget"')
        angular_data = re.sub(r",\n\s*\"defaultProject\": \"[^\"]+\"\n", "\n", angular_data)

        with open(angular_json, "w", encoding="utf-8", newline="\n") as f:
            f.write(angular_data)
        print(f"updated {angular_json}")

    rd = os.path.join(proj, "README.md")
    if os.path.exists(rd):
        with open(rd, "r", encoding="utf-8") as f:
            txt = f.read()

        txt, count = re.subn(
            r"This project was generated with \[Angular CLI\]\([^\)]+\) version [0-9\.]+\.",
            "This project was updated to Angular CLI version 21.2.0.",
            txt,
        )
        if count == 0 and "This project was updated to Angular CLI version 22.1.3." not in txt:
            lines = txt.splitlines()
            if len(lines) > 1 and lines[1].strip() == "":
                lines.insert(2, "This project was updated to Angular CLI version 22.1.3.")
            else:
                lines.insert(1, "This project was updated to Angular CLI version 22.1.3.")
            txt = "\n".join(lines) + "\n"

        with open(rd, "w", encoding="utf-8", newline="\n") as f:
            f.write(txt)
        print(f"updated {rd}")
