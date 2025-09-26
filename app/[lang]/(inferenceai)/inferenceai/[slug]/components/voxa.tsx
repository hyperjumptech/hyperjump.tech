"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Mic, Pause, Phone, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Voxa() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const hoverTimeValue = percentage * duration;
      setHoverTime(hoverTimeValue);
      setIsHovering(true);
    }
  };

  const handleProgressLeave = () => {
    setIsHovering(false);
    setHoverTime(null);
  };

  const handleRefreshDuration = () => {
    if (audioRef.current) {
      audioRef.current.load();
      setTimeout(() => {
        if (audioRef.current?.duration && !isNaN(audioRef.current.duration)) {
          setDuration(audioRef.current.duration);
          setIsAudioLoaded(true);
        }
      }, 100);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsAudioLoaded(true);
      }
    };
    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsAudioLoaded(true);
      }
    };
    const handleLoadedData = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsAudioLoaded(true);
      }
    };
    const handleError = (e: Event) => {
      setIsAudioLoaded(false);
    };
    const handleEnded = () => setIsPlaying(false);

    // Force load the audio
    audio.load();

    // Also try to access duration directly after a short delay
    setTimeout(() => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        setIsAudioLoaded(true);
      }
    }, 500);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    // Check if duration is already available
    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration);
      setIsAudioLoaded(true);
    }

    // Fallback: check duration periodically
    const checkDuration = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        setIsAudioLoaded(true);
        return true;
      }
      return false;
    };

    const intervalId = setInterval(() => {
      if (checkDuration()) {
        clearInterval(intervalId);
      }
    }, 100);

    // Clean up interval and event listeners
    return () => {
      clearInterval(intervalId);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="flex w-full max-w-7xl flex-col">
      {/* Timeline dotted line background */}
      <div className="relative flex flex-col items-center justify-center gap-6 px-4 lg:flex-row lg:gap-8 lg:px-0">
        {/* Vertical line for mobile/tablet, horizontal for desktop */}
        <div className="absolute top-0 bottom-0 left-1/2 z-0 w-0 -translate-x-1/2 animate-pulse border-l-2 border-dotted border-white lg:top-1/2 lg:right-0 lg:bottom-auto lg:left-0 lg:h-0 lg:w-auto lg:translate-x-0 lg:-translate-y-1/2 lg:border-t-2 lg:border-l-0" />

        {/* Step 1: Script & Phone */}
        <Card className="bg-card border-border hover:border-primary/50 relative z-10 min-h-72 w-full max-w-sm border-2 transition-colors lg:min-h-80 lg:max-w-none lg:flex-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <div className="bg-primary/10 mb-0 flex h-8 w-8 items-center justify-center rounded-full">
              <FileText className="text-primary h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">Your Input</p>
          </CardHeader>
          <CardContent className="max-h-full overflow-y-auto p-6">
            <div className="text-muted-foreground max-h-36 space-y-3 text-sm">
              <div>
                <p className="text-foreground mb-2 font-medium">
                  Phone Number:
                </p>
                <div className="bg-muted/50 rounded-lg border p-3">
                  <p className="font-mono text-xs">+1 (***) ***-1234</p>
                </div>
              </div>

              <div>
                <p className="text-foreground mb-2 font-medium">Your Script:</p>
                <div className="bg-muted/50 flex flex-col gap-4 rounded-lg border p-3">
                  <p>
                    Hi there, if I could cut your team&apos;s busywork by 30%
                    with AI this quarter, would you want to see how?
                  </p>
                  <p>
                    We at Inference AI, we help automate repetitive workflows so
                    your team can focus on high-value tasks.
                  </p>
                  <p>
                    If you are interested, send us an email to
                    solution@hyperjump.tech.
                  </p>
                  <p>Thank you for your time!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: VOXA */}
        <Card className="border-primary hover:border-primary relative z-10 min-h-72 w-full max-w-sm border-2 bg-white transition-colors lg:min-h-80 lg:max-w-none lg:flex-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <div className="bg-primary mb-0 flex h-8 w-8 items-center justify-center rounded-full">
              <Mic className="text-primary-foreground h-4 w-4" />
            </div>
            <p className="text-primary text-xl font-bold">VOXA</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6 text-center">
            <div className="mt-8 space-y-3">
              <p className="fontb text-sm">Processing</p>
              <div className="flex justify-center space-x-1">
                <div className="bg-primary h-2 w-2 animate-bounce rounded-full" />
                <div
                  className="bg-primary h-2 w-2 animate-bounce rounded-full"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="bg-primary h-2 w-2 animate-bounce rounded-full"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <p className="text-xs">Converting script to natural AI voice</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Result */}
        <Card className="bg-card border-border hover:border-primary/50 relative z-10 min-h-72 w-full max-w-sm border-2 transition-colors lg:min-h-80 lg:max-w-none lg:flex-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <div className="bg-primary/10 mb-0 flex h-8 w-8 items-center justify-center rounded-full">
              <Phone className="text-primary h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">Result</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm font-medium">
                The number you inputted will receive a call:
              </p>

              {/* Audio Player Mockup */}
              <div className="bg-muted/50 rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePlayPause}
                    className="h-8 w-8 rounded-full bg-transparent p-0">
                    {isPlaying ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                      <span>{formatTime(currentTime)}</span>
                      <span>/</span>
                      <span>
                        {isAudioLoaded ? formatTime(duration) : "Loading..."}
                      </span>
                    </div>
                    {!isAudioLoaded && (
                      <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                        <span>
                          Loading audio... (Duration: {duration}s, Loaded:{" "}
                          {isAudioLoaded ? "Yes" : "No"})
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleRefreshDuration}
                          className="h-5 w-5 rounded-full bg-transparent p-0 text-xs">
                          ↻
                        </Button>
                      </div>
                    )}
                    <div
                      className="bg-muted hover:bg-muted/80 relative h-2 w-full cursor-pointer rounded-full transition-colors"
                      onClick={handleSeek}
                      onMouseMove={handleProgressHover}
                      onMouseLeave={handleProgressLeave}
                      ref={progressBarRef}>
                      <div
                        className="bg-primary absolute top-0 left-0 h-2 rounded-full transition-all duration-100 ease-out"
                        style={{
                          width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
                        }}
                      />
                      <div
                        className="bg-primary/20 absolute top-0 left-0 h-2 w-2 -translate-x-1/2 rounded-full transition-all duration-100 ease-out"
                        style={{
                          left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
                        }}
                      />
                      {isHovering && hoverTime !== null && (
                        <>
                          <div
                            className="bg-primary/30 absolute top-0 h-2 w-0.5 transition-all duration-100 ease-out"
                            style={{ left: `${(hoverTime / duration) * 100}%` }}
                          />
                          <div
                            className="bg-primary text-primary-foreground absolute -top-8 left-0 z-10 -translate-x-1/2 transform rounded px-2 py-1 text-xs font-medium shadow-lg"
                            style={{
                              left: `${(hoverTime / duration) * 100}%`
                            }}>
                            {formatTime(hoverTime)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <audio
                    ref={audioRef}
                    src="/audios/voxa-en.mp3"
                    preload="metadata"
                    className="hidden"
                  />
                </div>
              </div>

              <p className="text-muted-foreground text-xs">
                AI voice calls your prospect automatically
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
