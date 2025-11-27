---
title: Building a Ham Radio Logger from Scratch
date: 2025-11-10
slug: ham-radio-logger
excerpt: I've been wanting to digitize my radio contacts for a while now, and I finally sat down to build a proper logging application.
---

I've been wanting to digitize my radio contacts for a while now, and I finally sat down to build a proper logging application. Most of the existing solutions felt too bloated for my needs, so I decided to roll my own using Python and a simple SQLite database.

## The Problem

As a ham radio operator, keeping track of contacts (or "QSOs" in amateur radio speak) is important for various awards and just general record-keeping. The traditional method is a paper logbook, but that's hard to search and analyze. Most logging software is either expensive, Windows-only, or packed with features I'll never use.

I wanted something simple: enter a callsign, automatically pull their info from QRZ.com, and save it to a local database. That's it.

## The Solution

I built a command-line tool in Python that does exactly what I need:
```python
python logger.py --callsign W1AW --frequency 14.250 --mode SSB
```

The script queries the QRZ.com API (you need an XML subscription for this, but it's worth it), pulls the operator's name and location, and stores everything in a SQLite database.

### Key Features

- Automatic QRZ.com lookups
- SQLite storage for fast searching
- Export to ADIF format
- Simple command-line interface

## What I Learned

This was my first time working with the QRZ API, and it was surprisingly straightforward. The XML interface is well-documented, and rate limiting isn't an issue for personal use.

## Next Steps

The tool works great for my needs, but there are a few features I might add:

- A simple web interface (maybe Flask?)
- Statistics and visualizations of my contacts
- Integration with my radio's CAT control for automatic frequency logging

For now though, it does exactly what I need. Sometimes the best software is the simplest.

If you're interested in the code, it's up on [GitHub](https://github.com). Feel free to fork it or open issues if you find bugs!