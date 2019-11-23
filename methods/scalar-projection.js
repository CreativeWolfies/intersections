function scalar_projection(A, B, C, D) {
  let $ = edge_cases(A, B, C, D);
  if ($ !== null) return $;

  let ux = A[1] - B[1];
  let uy = B[0] - A[0];
  let vx = C[1] - D[1];
  let vy = D[0] - C[0];

  let s1 = ux * (C[0] - A[0]) + uy * (C[1] - A[1]);
  let s2 = ux * (D[0] - A[0]) + uy * (D[1] - A[1]);

  let s3 = vx * (A[0] - C[0]) + vy * (A[1] - C[1]);
  let s4 = vx * (B[0] - C[0]) + vy * (B[1] - C[1]);

  return s1 * s2 <= 0 && s3 * s4 <= 0;
}

methods.push(scalar_projection);
