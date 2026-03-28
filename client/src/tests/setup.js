import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// mock IntersectionObserver for framer-motion in jsdom
class MockIntersectionObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

afterEach(() => {
  cleanup();
});
