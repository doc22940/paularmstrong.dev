---
id: presenting
title: Presenting & Sharing
---

## Code samples

### Carbon

Paste code samples and export syntax-highlighted code on [carbon.now.sh](https://carbon.now.sh). Perfect for emails and presentations when you want to share some code, but make it look pretty.

![Example SVG export from carbon.now.sh](/img/carbon.svg)

:::caution
These images are _not_ accessible and you should include the code sample in an accessible place.
:::

### Terminalizer

Want to share your terminal input & output, but feel like the static image isn't very good? Use [Terminalizer](https://terminalizer.com) to record and generate animated gifs or videos.

#### Install

Terminalizer is a commandline application written in Node.js that you need to install.

```bash npm2yarn
npm install -g terminalizer
```

```bash title="Generating GIFs"
# start recording
terminalizer record demo
# proceed to do whatever you want recorded
# ^D (CTRL-D) when done

# Render a GIF
terminalizer render demo
```

A quick sample that I recorded while working on this content:

![Terminalizer demo](/img/terminalizer.gif)

:::caution
These images are _not_ accessible and you should include the code sample in an accessible place.
:::