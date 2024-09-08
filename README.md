# Scribe: A Note-Taking CLI Tool

Scribe is a simple CLI tool built with Deno that allows you to write and store daily notes. It provides a simple way to manage your notes with commands directly from the terminal.

## Features

- Write notes with timestamps.
- Automatically organize notes into files by date.

## Usage

You can install `scribe` into a standalone binary and use it to create and append notes.

### Installation

To install scribe, run the following command:

```
deno task install
```

### Write a Note

Once installed, you can use `scribe` to write a note:

```
scribe "This is my note"
```

You will be prompted to set a path for your notes

### Display Help

For usage information, run the following:

```
./scribe --help
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
