import en from "../app/i18n/en"
import { exec } from "child_process"

// Use this array for keys that for whatever reason aren't greppable so they
// don't hold your test suite hostage by always failing.
const EXCEPTIONS = [
  // "welcomeScreen.readyForLaunch",
]

function iterate(obj, stack, array) {
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (typeof obj[property] === "object") {
        iterate(obj[property], `${stack}.${property}`, array)
      } else {
        array.push(`${stack.slice(1)}.${property}`)
      }
    }
  }

  return array
}



describe("i18n", () => {
  test("There are no missing keys", (done) => {
    // Actual command output:
    // grep "[T\|t]x=[{]\?\"\S*\"[}]\?\|translate(\"\S*\"" -ohr './app' | grep -o "\".*\""
    const command = `grep "[T\\|t]x=[{]\\?\\"\\S*\\"[}]\\?\\|translate(\\"\\S*\\"" -ohr './app' | grep -o "\\".*\\""`
    exec(command, (_, stdout) => {
      const allTranslationsDefined = iterate(en, "", [])
      const allTranslationsUsed = stdout.replace(/"/g, "").split("\n")
      allTranslationsUsed.splice(-1, 1)

      for (let i = 0; i < allTranslationsUsed.length; i += 1) {
        if (!EXCEPTIONS.includes(allTranslationsUsed[i])) {
          // You can add keys to EXCEPTIONS (above) if you don't want them included in the test
          expect(allTranslationsDefined).toContainEqual(allTranslationsUsed[i])
        }
      }
      done()
    })
  }, 240000)
})
