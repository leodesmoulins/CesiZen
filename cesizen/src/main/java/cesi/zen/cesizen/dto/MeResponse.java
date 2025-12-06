package cesi.zen.cesizen.dto;

import java.time.Instant;
import java.util.List;

public record MeResponse(
  Long id,
  String email,
  String firstName,
  String lastName,
  boolean isActive,
  Instant createdAt,
  Instant updatedAt,
  List<String> roles
) {}

