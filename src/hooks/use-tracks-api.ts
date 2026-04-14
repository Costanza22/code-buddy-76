import { useQuery } from "@tanstack/react-query";
import { fetchLesson, fetchTrack, fetchTracks } from "@/lib/api";

export function useTracks() {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
  });
}

export function useTrack(trackId: string | undefined) {
  return useQuery({
    queryKey: ["track", trackId],
    queryFn: () => fetchTrack(trackId!),
    enabled: Boolean(trackId),
  });
}

export function useLesson(trackId: string | undefined, lessonId: string | undefined) {
  return useQuery({
    queryKey: ["lesson", trackId, lessonId],
    queryFn: () => fetchLesson(trackId!, lessonId!),
    enabled: Boolean(trackId && lessonId),
  });
}

export type { LessonPayload } from "@/lib/api";
