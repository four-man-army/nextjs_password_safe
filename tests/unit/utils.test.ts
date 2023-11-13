
import {
  cn,
  addHttps,
  escapeHtml,
  encrypt,
  decrypt,
  genPw,
  absoluteUrl,
  constructMetadata,
} from "@/lib/utils";
import { Password } from "@/lib/validators/password";
import { describe, it, expect } from "vitest";

describe("cn function", () => {
  it("should merge classes", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });
});

describe("addHttps function", () => {
  it("should add 'https://' to a URL without it", () => {
    const result = addHttps("example.com");
    expect(result).toBe("https://example.com");
  });

  it("should not modify a URL with 'http://' or 'https://'", () => {
    const result = addHttps("https://secure-site.com");
    expect(result).toBe("https://secure-site.com");
  });
});

describe("escapeHtml function", () => {
  it("should escape HTML characters", () => {
    const result = escapeHtml("<script>alert('Hello')</script>");
    expect(result).toBe(
      "&lt;script&gt;alert(&#x27;Hello&#x27;)&lt;/script&gt;"
    );
  });
});

describe("encrypt and decrypt functions", () => {
  it("should encrypt and decrypt a password", () => {
    const password: Password = {
      id: "1",
      password: "123",
      username: "user",
      website: "example.com",
    };
    const key = "myEncryptionKey";
    const encryptedPassword = encrypt(password, key);
    const decryptedPassword = decrypt(encryptedPassword, key);
    expect(JSON.stringify(password)).toBe(decryptedPassword);
  });
});

describe("genPw function", () => {
  it("should generate a password based on type and modes", () => {
    const length = 12;
    const type = "say";
    const modes = ["uppercase", "lowercase", "numbers", "symbols"];
    const result = genPw(length, type, modes as any);
    expect(result).toBeTypeOf("string");
    expect(result.length).toBe(length);
  });
});

describe("absoluteUrl function", () => {
  it("should construct an absolute URL", () => {
    const path = "/some-path";
    const result = absoluteUrl(path);
    expect(result).toBeTypeOf("string");
    expect(result).toBe("http://localhost:3000/some-path");
  });
});

describe("constructMetadata function", () => {
  it("should construct metadata with custom values", () => {
    const metadata = constructMetadata({
      title: "Custom Title",
      description: "Custom Description",
      image: "/custom-image.jpg",
      icons: "/custom-favicon.ico",
      noIndex: true,
    });
    expect(metadata).toBeTypeOf("object");
    expect(metadata.title).toBe("Custom Title");
    expect(metadata.description).toBe("Custom Description");
  });
});
