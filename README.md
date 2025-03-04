# What is Heroes App?

Heroes App displays a list of heroes from Marvel and DC. You can add, delete, modify, and search for heroes.

## How to Run the Project

You need to have [Node.js](https://nodejs.org/en/download) installed to run this project.

If you have already installed Node.js, then execute the following commands in your preferred CLI.

```bash
  npm install
```
```bash
  npm run start
```
If everything runs correctly, you should see something like this:

```bash
    Initial chunk files | Names         |  Raw size
    styles.css          | styles        | 532.82 kB |
    polyfills.js        | polyfills     |  90.20 kB |
    chunk-K5J2G56Z.js   | -             |  65.86 kB |
    chunk-MVVEDMUQ.js   | -             |  22.52 kB |
    main.js             | main          |   7.97 kB |
    chunk-BXOREKBX.js   | -             |   3.83 kB |

                        | Initial total | 723.19 kB

    Lazy chunk files    | Names         |  Raw size
    chunk-XJNRG77L.js   | heroes-module | 154 bytes |
    chunk-AA2QPNON.js   | auth-module   | 150 bytes |

    Application bundle generation complete. [3.950 seconds]

    Watch mode enabled. Watching for file changes...
    NOTE: Raw file sizes do not reflect development server per-request transformations.
    Re-optimizing dependencies because lockfile has changed
      ➜  Local:   http://127.0.0.1:4200/
      ➜  press h + enter to show help
```
